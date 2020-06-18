<template>
  <section class="postList">
    <PostPreview
      id="1"
      :is-admin="isAdmin"
      thumbnail="https://c.wallhere.com/photos/c0/31/minimalism_forest_triangle_digital_art_artwork-1702621.jpg!d"
      title="Testing 1"
      previewText="Hello world"
    />
    <PostPreview
      id="2"
      thumbnail="https://c.wallhere.com/photos/c0/31/minimalism_forest_triangle_digital_art_artwork-1702621.jpg!d"
      title="Testing 2"
      previewText="Hello world 2"
    />
    <PostPreview
      id="3"
      thumbnail="https://c.wallhere.com/photos/c0/31/minimalism_forest_triangle_digital_art_artwork-1702621.jpg!d"
      title="Testing 3"
      previewText="Hello world 3"
    />
  </section>
</template>

<script>
import PostPreview from '~/components/Posts/PostPreview'
export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.postList {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>