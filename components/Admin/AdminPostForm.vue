<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>

    <AppControlInput v-model="editedPost.title">Title</AppControlInput>

    <AppControlInput v-model="editedPost.thumbnail">Thumbnail Link</AppControlInput>
    <AppControlInput v-model="editedPost.previewText">Preview Text</AppControlInput>

    <AppControlInput control-type="textarea" v-model="editedPost.content">Content</AppControlInput>
    <div class="uploadButton">
      <label for>Upload an image</label>
      <br />
      <input type="file" @change="uploadImage" />
      <br />
    </div>
    <AppButton type="submit">Save</AppButton>

    <AppButton type="button" style="margin-left: 10px" btn-style="cancel" @click="onCancel">Cancel</AppButton>
  </form>
</template>

<script>
import AppControlInput from "~/components/UI/AppControlInput";
import AppButton from "~/components/UI/AppButton";
export default {
  components: {
    AppControlInput,
    AppButton
  },
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
            author: "",
            title: "",
            thumbnail: "",
            previewText: "",
            content: ""
          }
    };
  },
  methods: {
    onSave() {
      //Saving a post
      this.$emit("submit", this.editedPost);
    },
    onCancel() {
      //Canceling a post
      this.$router.push("/admin");
    },
    uploadImage(event) {
      // const ref = firebase.storage().ref;
      // const file = document.query;
      console.log(event);
    }
  }
};
</script>

<style>
</style>