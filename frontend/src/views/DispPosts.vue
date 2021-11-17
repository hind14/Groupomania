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
            <router-link class="router-style" to="/mon_profil"
              >Mon profil
            </router-link>
          </li>
          <li>
            <router-link to="/" @click="logout" class="router-style"
              >Deconnexion</router-link
            >
          </li>
          <li>
            <router-link
              id="add-post"
              class="router-style"
              to="/ecrire-un-nouvel-article"
              >Ajouter un article</router-link
            >
          </li>
        </ul>
      </nav>
    </div>

    <h1>Tous les articles</h1>

    <!-- Page fil d'actualité : on charge une liste d'articles vertical avec
    Nom et Prénom de l'auteur, date de publication, Titre & premiers mots du contenu. -->

    <!-- Liste des articles, relié grâce à une boucle for
      Afficher l'objet post dans le tableau posts -->
    <ul id="list-container">
      <li id="post" v-for="post in posts" :key="post">
        <h2>{{ post.title }}</h2>
        <div id="post-content">{{ post.content }}</div>
        <div id="published"> Publié le {{ post.createdAt }} par {{ post.user.name }} {{ post.user.lastname }}</div>

        <!-- Chemin qui redirige vers la page qui affiche l'article grâce à son id-->
        <router-link id="link-to-article" :to="{ name: 'OnePost', params: { id: post.id } }"
          >Voir l'article</router-link
        >
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
* {
  text-decoration: none;
}
#list-container {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#post {
  border-radius: 15px;
  background-color: rgb(195, 233, 223);
  margin: 20px;
  padding: 40px;
  width: 300px;
  overflow: hidden;
}
#post-content {
  text-overflow: ellipsis; 
  overflow: hidden;
  margin-bottom: 20px;
  white-space: nowrap;
}
#link-to-article {
  border: 1px rgb(82, 66, 112) solid;
  border-radius: 5px;
  padding: 10px;
  color: black;
}
#published {
  margin: 20px;
}
</style>