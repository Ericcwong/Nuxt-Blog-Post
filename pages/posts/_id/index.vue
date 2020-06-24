<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{loadedPost.title}}</h1>
      <div class="post-details">
        <div class="post-detail">Last updated on {{loadedPost.updatedDate}}</div>
        <div class="post-detail">Written by {{loadedPost.author}}</div>
      </div>
      <p>{{loadedPost.content}}</p>
    </section>
    <section class="post-feedback">
      <p class="post-content">
        If any questions, send me an email at
        <a
          href="mailto:ericwong12@live.com"
        >Ericwong12@live.com</a>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  asyncData(context) {
    return new Promise((resolve, reject) => {
      console.log(context)
      setTimeout(() => {
        resolve({
          loadedPost: {
            id: '1',
            title: 'First Post (ID: ' + context.params.id + ')',
            previewText: 'First Post!',
            author: 'Eric Wong',
            updatedDate: new Date(),
            content: 'Filler text',
            thumbnail:
              'https://c.wallhere.com/photos/c0/31/minimalism_forest_triangle_digital_art_artwork-1702621.jpg!d'
          }
        })
      }, 1000)
    })
      .then(data => {
        return data
      })
      .catch(e => {
        context.error(new Error())
      })
  }
}
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>