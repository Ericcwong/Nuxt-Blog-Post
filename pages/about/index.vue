<template>
  <div class="aboutPage">
    <h1>Welcome to my journey blog!</h1>
    <div class="content">
      <div class="contentImage">
        <img src="/selfie.png" alt />
      </div>
      <div class="contentText">
        <p>
          My name is Eric and I am a full stack web developer. I never thought that I would ever start a blog but after
          so many life event happening, it becomes harder to keep track of what has been happening. That is why I decided to create a blog!
        </p>
        <p>
          Although it isn't the most pretty or functional web blog, it is a start of something, the best thing about this is that I am able to make it the way I want it to be.
          For future addons I want to be able to add images to each individual blog post and make it more interactive for users.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aboutPage {
  margin: 30px;
}
h1 {
  text-align: center;
  margin-bottom: 30px;
}
.content {
  text-align: center;
  display: flex;
  max-width: 900px;
  margin: 0 auto;
}
.contentImage {
  margin-right: 20px;
}
p {
  font-size: 1.25rem;
}
@media screen and (max-width: 700px) {
  .content {
    display: inline;
  }
  .contentImage {
    text-align: center;
  }
}
</style>
