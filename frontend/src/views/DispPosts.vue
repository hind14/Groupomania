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
            <router-link class="router-style" to="/profil"
              >Mon profil
            </router-link>
          </li>
          <li>
            <router-link to="/" @click="logout" class="router-style"
              >Deconnexion</router-link
            >
          </li>
          <li>
            <router-link id="add-post" class="router-style" to="/ecrire-un-nouvel-article"
              >Ajouter un article</router-link
            >
          </li>
        </ul>
      </nav>
    </div>

    <h1>Tous les articles à votre disposition</h1>

    <!-- Page fil d'actualité : on charge une liste d'articles vertical avec
 Nom et Prénom de l'auteur, date de publication, Titre & premiers mots du contenu.
  -->
      <!-- Liste des articles, relié grâce à une boucle for
      Afficher l'objet post dans le tableau posts -->
    <ul class="list-container">
      <li class="list-posts" v-for="post in posts" :key="post">
        <h4>{{ post.title }}</h4>
        <div>{{ post.content }}</div>
        <div>Publié à {{ post.createdAt }} par</div>

        <!-- Chemin qui redirige vers la page qui affiche l'article grâce à son id-->
        <router-link :to="{ name: 'OnePost', params: { id: post.id } }">Voir l'article</router-link>
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
      //La liste d'articles est dans un tableau contenant plusieurs objets post
      posts: [],
    };
  },
  //
  methods: {
    //Fonction qui récupère les données des articles
    retrievePosts() {

    //Appel de PostRoutes (axios) pour autoriser la récupération des données
    // avec la méthode getAll (get)
      PostRoutes.getAll()
        .then((res) => {

          //this.posts = récup data et envoie une réponse avec les articles
          this.posts = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      localStorage.removeItem("groupomania-user");
      this.$router.push("connexion");
    },
  },
  //La fonction qui affiche les articles est montée dans le DOM
  mounted() {
    this.retrievePosts();
  },
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