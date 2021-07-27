<template>
  <div class="posting">
    
    <div id="header">
      <img
        id="icon-groupo"
        src="../images/icon-groupo.png"
        alt="icon groupomania"
      />
      <nav>
        <ul>
          <li>
            <router-link class="router-style" to="/profil">Mon profil </router-link>
          </li>
          <!-- <li>
            <router-link to="/" @click="logout" class="router-style">Deconnexion</router-link>
          </li> -->
          <li>
            <router-link to="/articles"> Articles </router-link>
          </li>
        </ul>
      </nav>
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
      <router-link to="/articles"> Retour à la liste des articles </router-link>
    </div>
  </div>
</template>

<script>
import PostRoutes from "../services/auth.posts";

export default {
  name: "NewPost",
  data() { 
    return {
      post: {
        id: null,
        title: "",
        content: ""
      },
      submitted: false,
    };
  },
  methods: {
    
    sendPost() {
      const userId = localStorage.getItem("groupomania", userId);
      const data = {
        title: this.post.title,
        content: this.post.content,
      };
      PostRoutes.create(data)
        .then((res) => {
          userId,
          this.post.id = res.data.id;
          this.submitted = true;
        })

        .catch((error) => {
          console.log(error, 'erreur axios post');
        });
    },
  },
};
</script>

<style>
#content {
  width: 400px;
  height: 400px;
  padding: 10px;
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