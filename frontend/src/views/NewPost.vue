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
            <router-link class="router-style" to="/profil"
              >Mon profil
            </router-link>
          </li>
          <li>
            <router-link to="/" @click="logout" class="router-style">Deconnexion</router-link>
          </li>
          <li>
            <router-link to="/articles"> Articles </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <h1>Postez vos articles !</h1>

    <!-- Condition: si l'article a été posté (valeur mise à false) : afficher le libellé
    + utilisation de v-model pour relier au data -->
    <div v-if="!submitted">
      <div id="title-field">
        <label for="title">Titre</label>
        <input
          type="text"
          id="title"
          required
          v-model="post.title"
          name="title"
        />
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

    <!--Sinon, afficher sur la page que l'article a été posté
    + route vers la listes des artciles-->
    <div v-else>
      <h4>L'article a été posté !</h4>
      <router-link to="/articles"> Retour à la liste des articles </router-link>
    </div>
  </div>
</template>

<script>
import PostRoutes from "../services/auth.posts";

export default {
  name: "NewPost",
  //Enregistrement des donées: l'objet post contient l'id, le titre et le contenu d'un article
  data() {
    return {
      post: {
        id: null,
        title: "",
        content: "",
      },
      submitted: false,
    };
  },
  methods: {
    //Fonction qui permet la création d'un article tout en récupérant 
    //l'id de l'utilisateur issue du localStorage
    sendPost() {
      const storage = JSON.parse(localStorage.getItem("groupomania-user"));

      //variable contentant un objet avec le titre, contenu et l'id de l'utilisateur
      //Utilisation de this. pour récup le data du post
      const data = {
        title: this.post.title,
        content: this.post.content,
        userId: storage.userId,
      };

      //Appel de PostRoutes (axios) pour autoriser l'envoie des données avec la méthode
      // create (post) et qui prend en argument la variable data
      PostRoutes.create(data)
        .then(() => {
          this.submitted = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //Déconnexion en retirant du localStorage l'utilisateur 
    //Redirection vers la page de connexion
     logout() {
      localStorage.removeItem("groupomania-user");
      this.$router.push("connexion");
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