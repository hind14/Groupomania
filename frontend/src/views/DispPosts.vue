<template>
  <div class="all-posts">
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
            <router-link id="add-post" to="/ecrire-un-nouvel-article">Ajouter un article</router-link>
          </li>
        </ul>
      </nav>
    </div>

    <h1>Tous les articles à votre disposition</h1>

<!-- Page fil d'actualité : on charge une liste d'articles vertical avec
 Nom et Prénom de l'auteur, date de publication, Titre & premiers mots du contenu.
  -->
    <ul class="list-container">
      <li
        class="list-posts"
        :class="{ active: index}"
        v-for="(post, index) in posts"
        :key="index"
      >
      <h4> {{ post.title }} </h4>
      {{ post.content}} 
      <div> Publié à {{ post.createdAt }}  par </div>
      <i  @click="trashPost"  class="fas fa-trash"></i>
          <div class="comments">commentaire ici</div>
      </li>
    </ul>
  </div>
</template>

<script>
import PostRoutes from "../services/auth.posts";

export default {
  name: "AllPosts",
  data() {
    return {
      posts: []
    };
  },
  methods: {
    retrievePosts() {
      PostRoutes.getAll()
        .then((res) => {
          this.posts = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.retrievePosts();
  }
  // trashPost() {
  //   //recp userId + delete post
  // }
  // logout() {
  //     localStorage.remove("groupomania");
  // }
};
</script>

<style>
.list-posts {
  border: black 2px solid;
  background-color: burlywood;
  margin: 20px;
  padding: 10px;
}
.comments {
  background-color: brown;
  border: black 2px solid;
  padding: 10px;
}
</style>