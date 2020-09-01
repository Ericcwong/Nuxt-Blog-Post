 <template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <h1>Sign in</h1>
      <form @submit.prevent="onSubmit">
        <AppControlInput type="email" v-model="email">E-Mail Address</AppControlInput>
        <AppControlInput type="password" v-model="password">Password</AppControlInput>
        <!-- <p style="color=red">{{}}</p> -->
        <AppButton type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
        <AppButton>
          <nuxt-link to="/">Return Home</nuxt-link>
        </AppButton>
        <!-- Removed Sign up option -->
        <!-- <AppButton
          type="button"
          btn-style="inverted"
          style="margin-left: 10px"
          @click="isLogin = !isLogin"
        >Switch to {{ isLogin ? 'Signup' : 'Login' }}</AppButton>-->
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminAuthPage",
  layout: "admin",
  data() {
    return {
      isLogin: true,
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("authenticateUser", {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push("/admin");
        });
    }
  }
};
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
  height: 100vh;
  position: relative;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
a {
  color: white;
}
</style>
