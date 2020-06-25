<template>
  <div class="posts">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from '~/components/Posts/PostList'

export default {
  components: {
    PostList
  },

  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
}
//   asyncData(context, callback) {
//     setTimeout(() => {
//       callback(null, {
//         loadedPosts: [
//           {
//             id: '1',
//             title: 'First Post',
//             previewText: 'First Post!',
//             thumbnail:
//               'https://c.wallhere.com/photos/c0/31/minimalism_forest_triangle_digital_art_artwork-1702621.jpg!d'
//           },
//           {
//             id: '2',
//             title: 'Second Post',
//             previewText: 'Second Post!',
//             thumbnail:
//               'https://c.wallhere.com/photos/c0/31/minimalism_forest_triangle_digital_art_artwork-1702621.jpg!d'
//           }
//         ]
//       })
//     }, 1000)
//   }
</script>

<style scoped>
.post {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>