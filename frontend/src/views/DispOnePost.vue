<template>
  <div class="my-post">
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
            <router-link to="/articles"> Articles </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div>
      <!-- Affichage d'un article -->
      <div>
        <h1>{{ post.title }}</h1>
        <div>{{ post.content }}</div>
        <span> Article écrit par {{ storage.userId }}</span>

        <!-- Affichage du btn supp si l'userId est le même que celui qui est
        dans le localStorage + btn lié avec l'évenement onclick-->
        <div v-if="storage.userId === post.userId">
          <button @click="deletePost">Supprimer</button>
        </div>
      </div>

      <!-- Ecrire un commentaire, afficher la liste des commentaire et
     supprimer le commentaire si le com possède le même userId que l'utilisateur 
     connecté -->
      <div>
        <!-- Ecrire un commentaire -->
        <div id="content-create-com">
          <div>
            <textarea
              type="text"
              required
              v-model="comment.content"
              placeholder="Ecrivez votre commentaire..."
              name="content"
            >
            </textarea>
          </div>

          <button @click="sendCom" class="btn btn-success">
            Ajouter votre commentaire
          </button>
        </div>

        <ul>
          <!-- Affichage de la liste des commentaires-->
          <li v-for="(comment, index) in comments" :key="index">
            <div>{{ comment.content }}</div>

            <!-- Affichage du btn supp si l'userId est le même que celui qui est
             dans le localStorage + btn lié avec l'évenement onclick-->
            <div v-if="storage.userId === comment.userId">
              <button @click="deleteCom">Supprimer</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PostRoutes from "../services/auth.posts";

export default {
  name: "OnePost",
  data() {
    return {
      //tableau des commentaires, objet contenant l'id et le contenu d'un com
      //l'article se trouve dans un objet, et le storage qui contiendra le localStorage
      storage: "",
      post: {},
      comments: [],
      comment: {
        id: null,
        content: "",
      },
    };
  },
  methods: {

    //Fonction qui récupère l'article selon son id
    getOnePost(id) {

      //Appel de PostRoutes (axios) pour autoriser la récupération des données
      //avec la méthode get (get) et prend en paramètre l'id de l'article
      PostRoutes.get(id)
        .then((res) => {
          this.post = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //Fonction qui supprime l'article en prenant l'id du post
    deletePost() {
      
      //Appel de PostRoutes (axios) pour autoriser la récupération des données
      //avec la méthode delete (delete) et prend en paramètre l'id de l'article
      PostRoutes.delete(this.post.id)
        .then((res) => {
          console.log("the response", res.data);
          alert("Article supprimé !");

          //Redirection vers la page qui contient tous les articles
          this.$router.push({ name: "AllPosts" });
        })
        .catch((error) => {
          console.log("erreur suppresion", error);
        });
    },

    //Déconnexion en retirant du localStorage l'utilisateur 
    //Redirection vers la page de connexion
    logout() {
      localStorage.removeItem("groupomania-user");
      this.$router.push("connexion");
    },
  },
  //La fonction qui récupère l'article est montée dans le DOM
  //qui prend en paramètre un valeur dynamique qui mène à la route 'articles/:id'
  mounted() {
    this.getOnePost(this.$route.params.id);
    this.storage = JSON.parse(localStorage.getItem("groupomania-user"));
  },
};
</script>

<style>
#com-list {
  border: 2px solid black;
  background-color: cadetblue;
}
</style>