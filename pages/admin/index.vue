<template>
  <div class="admin-page">
    <section class="new-post">
      <AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton>
      <AppButton>
        <nuxt-link to="/">Home</nuxt-link>
      </AppButton>
      <AppButton @click="onLogout">Logout</AppButton>
    </section>
    <section class="existing-posts">
      <h1>Existing posts</h1>
      <PostList :posts="loadedPost" isAdmin />
    </section>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["auth"],
  computed: {
    loadedPost() {
      return this.$store.getters.loadedPosts;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/admin/auth");
    }
  }
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 3px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
a {
  color: white;
}
</style>