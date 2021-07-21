<template>
  <div class="posting">
    <h1>Postez vos articles !</h1>
    <div v-if="!submitted">
      <form id="posts-form">
        <div id="title-field">
          <label for="title">Titre</label>
          <input type="text" id="title" required="true" v-model="title" />
        </div>

        <div id="content-field">
          <label for="content"></label>
          <textarea
            type="text"
            id="content"
            required="true"
            v-model="content"
            placeholder="Ecrivez votre article..."
          >
          </textarea>
        </div>

        <button @click="sendPost" class="btn btn-success">
          Poster l'article
        </button>
      </form>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newPost">Add</button>
    </div>
  </div>
</template>

<script>
import PostsRoutes from "../services/Post-routes";

export default {
  data() {
    return {
      post: {
        id: null,
        title: "",
        content: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    sendPost() {
      const createPost = {
        title: this.post.title,
        content: this.post.content,
      };
      PostsRoutes.create(createPost)
        .then((response) => {
          this.post.id = response.createPost.id;
          console.log(response.createPost);
          this.submitted = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    newPost() {
      this.submitted = false;
      this.post = {};
    },
  },
};
</script>

<style>
#content {
  padding: 10px 300px 300px 10px;
}
#title-field {
  margin: 20px;
}
button {
  margin: 20px;
  padding: 20px;
  border-radius: 15px;
}
</style>