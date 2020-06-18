<template>
  <div class="posts">
    <PostList />
  </div>
</template>

<script>
import PostList from '~/components/Posts/PostList'
export default {
  components: {
    PostList
  }
}
</script>

<style scoped>
.post {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>