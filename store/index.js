import Vuex from "vuex"
import Cookie from "js-cookie";
// import axios from "axios"
//Single Store
const createStore = () => {
  //Every user would get a new store
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
        state.loadedPosts[postIndex] = editedPost
      },
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios.$get("https://nuxt-blog-f52b3.firebaseio.com/posts.json")
          .then(data => {
            const postsArray = []
            for (const key in data) {
              postsArray.push({
                ...data[key],
                id: key
              })
            }
            vuexContext.commit("setPosts", postsArray)
          })
          .catch((error) => console.log(error))
      },
      addPost(vuexContext, postData) {
        const createdPost = {
          ...postData,
          updatedDate: new Date()
        }
        return this.$axios
          .$post('https://nuxt-blog-f52b3.firebaseio.com/posts.json?auth=' + vuexContext.state.token, createdPost)
          .then(data => {
            vuexContext.commit('addPost', {
              ...createdPost,
              id: data.name
            })
          })
          .catch(error => context.error(error))
      },
      editPost(vuexContext, editedPost) {
        return this.$axios
          .$put(
            'https://nuxt-blog-f52b3.firebaseio.com/posts/' +
            editedPost.id +
            '.json?auth=' + vuexContext.state.token,
            editedPost
          )
          .then(data => {
            vuexContext.commit("editPost", editedPost)
          })
          .catch(e => console.log(e))
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts)
      },
      authenticateUser(vuexContext, authData) {
        let authURL =
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          process.env.fbAPIKEY
        if (!authData.isLogin) {
          authURL =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            process.env.fbAPIKEY
        }
        return this.$axios
          .$post(authURL, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(res => {
            vuexContext.commit("setToken", res.idToken)
            localStorage.setItem("token", res.idToken)
            localStorage.setItem("tokenExpiration", new Date().getTime() + Number.parseInt(res.expiresIn) * 1000)
            Cookie.set("jwt", res.idToken)
            Cookie.set("expirationDate", new Date().getTime() + Number.parseInt(res.expiresIn) * 1000)
            return this.$axios.$post("http://localhost:3000/api/track-data", {
              data: "Authenticated"
            })
          })

          .catch(err =>
            console.warn('Auth Error Message: ', err.response.data.error.message)
          )
      },

      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.header.cookie) {
            return
          }
          const jwtCookie = req.header.cookie.split(';').find(c => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.header.cookie.split(';').find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
          if (!jwtCookie) {
            return
          }
          const token = jwtCookie.split("=")[1];
        } else {
          token = localStorage.getItem("token")
          expirationDate = localStorage.getItem("tokenExpiration")
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log("No token or invalid token")
          vuexContext.dispatch("logout")
          return;
        }
        vuexContext.commit("setToken", token)
      },
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token != null
      }
    }
  });
};
export default createStore
