import Vuex from "vuex"
import axios from "axios"
//Single Store
const createStore = () => {
  //Every user would get a new store
  return new Vuex.Store({
    state: {
      loadedPosts: []
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
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get("https://nuxt-blog-f52b3.firebaseio.com/posts.json")
          .then(res => {
            const postsArray = []
            for (const key in res.data) {
              postsArray.push({
                ...res.data[key],
                id: key
              })
            }
            vuexContext.commit("setPosts", postsArray)
          })
          .catch((error) => console.log(error))
        //This is just a part of a dummy code to show and off that you can store data here and call it in different components
        // return new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     vuexContext.commit("setPosts",
        //       [{
        //           id: '1',
        //           title: 'First Post',
        //           previewText: 'First Post!',
        //           thumbnail: 'https://c.wallhere.com/photos/c0/31/minimalism_forest_triangle_digital_art_artwork-1702621.jpg!d'
        //         },
        //         {
        //           id: '2',
        //           title: 'Second Post',
        //           previewText: 'Second Post!',
        //           thumbnail: 'https://c.wallhere.com/photos/c0/31/minimalism_forest_triangle_digital_art_artwork-1702621.jpg!d'
        //         }
        //       ]
        //     )
        //     resolve();
        //   }, 1000)
        // })
      },
      addPost(vuexContext, postData) {
        const createdPost = {
          ...postData,
          updatedDate: new Date()
        }
        return axios
          .post('https://nuxt-blog-f52b3.firebaseio.com/posts.json', createdPost)
          .then(res => {
            vuexContext.commit('addPost', {
              ...createdPost,
              id: res.data.name
            })
          })
          .catch(error => context.error(error))
      },
      editPost(vuexContext, editedPost) {
        axios
          .put(
            'https://nuxt-blog-f52b3.firebaseio.com/posts/' +
            editedPost.id +
            '.json',
            editedPost
          )
          .then(res => {
            vuexContext.commit("editPost", editedPost)
          })
          .catch(e => console.log(e))
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts)
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      }
    }
  });
};
export default createStore
