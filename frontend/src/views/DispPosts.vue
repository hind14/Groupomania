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
            <router-link class="router-style" to="/profile">Mon profil </router-link>
          </li>
          <li>
            <router-link class="router-style" to="/">Deconnexion</router-link>
          </li>
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
    <ul class="list-group">
      <li
        class="list-group-item"
        :class="{ active: index == currentIndex }"
        v-for="(post, index) in posts"
        :key="index"
      >
        {{ post }}
      </li>
    </ul>
    <!-- <div v-if="currentPosts">
      <div>
        <label><strong>Titre:</strong></label>
        {{ currentPosts.title }}
      </div>
      <div>
        <label><strong>Contenu:</strong></label>
        {{ currentPosts.content }}
      </div>
      <div></div>

      <router-link to="/modifier-votre-article/" + currentPosts.id>
        Modidier votre article
      </router-link>
    </div>
    <div v-else>
      <br />
      <p>Il n'y a aucun article.</p>
    </div> -->
  </div>
</template>

<script>
import PostRoutes from "../services/Post-routes";

export default {
  name: "AllPosts",
  data() {
    return {
      posts: [],
      currentPosts: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrievePosts() {
      PostRoutes.getAll()
        .then((response) => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data, "erreur axios get");
        });
    },
    //   refreshList() {
    //     this.retrievePosts();
    //     this.currentPosts = null;
    //     this.currentIndex = -1;
    //   },
    //   setActivePost(post, index) {
    //     this.currentPosts = post;
    //     this.currentIndex = index;
    //   },
  },
  mounted() {
    this.retrievePosts();
  },
};
</script>

<style>
</style>