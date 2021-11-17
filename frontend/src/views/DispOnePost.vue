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
            <router-link class="router-style" to="/mon_profil"> Mon profil </router-link>
          </li>
          <li>
            <router-link to="/" @click="logout" class="router-style"> Deconnexion </router-link>
          </li>
          <li>
            <router-link to="/articles"> Articles </router-link>
          </li>
           <li>
            <router-link id="add-post" class="router-style" to="/ecrire-un-nouvel-article"> Ajouter un article </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div id="post-container">
      <!-- Affichage d'un article -->
      <h1>{{ post.title }}</h1>
      <div>{{ post.content }}</div>
      <div>Publié à {{ post.createdAt }} par   </div>

      <!-- Affichage du btn supp si l'userId est le même que celui qui est
      dans le localStorage + btn lié avec l'événement onclick-->
      <div v-if="storage.userId === post.userId">
        <button @click="deletePost">Supprimer</button>
      </div>

      <!-- Ecrire un commentaire, afficher la liste des commentaires et
      supprimer le commentaire si le ce dernier possède le même userId que l'utilisateur 
      connecté -->

      <!-- Ecrire un commentaire -->
        <div id="create-com">
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

          <button @click="sendComment" class="btn btn-success">
            Ajouter votre commentaire
          </button>
        </div>

        <!-- Affichage de la liste des commentaires-->
        <ul>
          <li v-for="comment in comments" :key="comment.content" id="com-list">
            <div>{{ comment.content }}</div>

           <!-- Affichage du btn supp si l'userId est le même que celui qui est
             dans le localStorage + btn lié avec l'évenement onclick -->
            <div v-if="storage.userId === comment.userId">
              <button @click="deleteComment">Supprimer</button>
            </div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import PostRoutes from "../services/auth.posts";
import CommentsRoutes from "../services/auth.comments";
import swal from "sweetalert";

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
        id: "",
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
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //Fonction qui supprime l'article en prenant l'id du post
    deletePost() {
      swal({ text: 'Voulez-vous supprimer votre article ?', buttons: true})
      .then((willDelete) => {
      if (willDelete) {
        PostRoutes.delete(this.post.id)
        .then(() => {
         swal("Article supprimé !");

          //Redirection vers la page qui contient tous les articles
          this.$router.push({ name: "AllPosts" });
        })
        .catch((error) => {
          console.log( error);
        });
      } else {
      swal("Votre article n'a pas été supprimé!");
      }
      });
      //Appel de PostRoutes (axios) pour autoriser la récupération des données
      //avec la méthode delete (delete) et prend en paramètre l'id de l'article
    },

    //Création d'un com
    sendComment() {
      const storage = JSON.parse(localStorage.getItem("groupomania-user"));

      //Variable qui stocke le contenu, l'id de l'utilisateur connecté (ds le localStorage)
      //et l'id du post sur lequel le commenaire va être écrit
      const data = {
        content: this.comment.content,
        userId: storage.userId,
        postId: this.post.id,
      };

      CommentsRoutes.create(data)
        .then(() => {
          this.$router.go();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //Affichage des commentaires
    displayAllComments(comments) {
      CommentsRoutes.getAll(comments)
        .then((res) => {
          console.log("Affichage des com", res.data);
          this.comments = res.data.comments;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // //Suppression des com
    deleteComment() {
      CommentsRoutes.delete(this.comment.id)
        .then((res) => {
          console.log("Suppression d'un com", res.data);
        })
        .catch((error) => {
          console.log("erreur suppresion", error);
        });
    },

      //Déconnexion en retirant du localStorage l'utilisateur (userId et token)
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
    this.displayAllComments();
    this.storage = JSON.parse(localStorage.getItem("groupomania-user"));
  },
};
</script>

<style>
#com-list {
  border: 2px solid black;
  background-color: cadetblue;
}
button {
  margin: 20px;
  padding: 10px;
  border-radius: 15px;
}
</style>