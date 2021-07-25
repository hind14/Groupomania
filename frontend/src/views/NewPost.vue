<template>
  <div class="posting">
    
  <div>
    <ul id="nav">
      <li><router-link to="/articles"> Retour </router-link></li>
    </ul>
    <router-view />
  </div>
  
    <h1>Postez vos articles !</h1>

    <div v-if="!submitted">
        <div id="title-field">
          <label for="title">Titre</label>
          <input
           type="text" 
           id="title" 
           required 
           v-model="post.title"
           name="title" />
        </div>

        <div id="content-field">
          <label for="content"></label>
          <textarea
            type="text"
            id="content"
            required
            v-model="post.content"
            placeholder="Ecrivez votre article..."
            name="content"
          >
          </textarea>
        </div>

        <button @click="sendPost" class="btn btn-success">
          Poster l'article
        </button>
    </div>

    <div v-else>
      <h4>L'article  a été posté !</h4>
      <button class="btn btn-success" @click="newPost">Ajouter</button>
    </div>
  </div>
</template>

<script>
import PostRoutes from "../services/Post-routes";

export default {
  name: "NewPost",
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
      const data = {
        title: this.post.title,
        content: this.post.content,
      };
      PostRoutes.create(data)
        .then((response) => {
          this.post.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((error) => {
          console.log(error, 'erreur axios post');
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