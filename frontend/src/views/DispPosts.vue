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
          <li>
            <button @click="logout" class="router-style">Deconnexion</button>
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
    <ul class="list-container">
      <li
        class="list-posts"
        v-for="post in posts"
        :key="post"
      >
      <h4> {{ post.title }} </h4>
      <div>{{ post.content}} </div>
      <div> Publié à {{ post.createdAt }}  par  </div>
                <router-link :to="{name: 'OnePost', params: { id: post.id }}">Voir l'article</router-link>
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
  },
  // logout(res) {
  //     localStorage.removeItem("groupomania");
  //     this.$router.push("connexion");
  //     console.log(res, 'logout')
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