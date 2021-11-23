<template>
  <div class="one-post">
    <div id="header">
      <img
        id="icon-groupo"
        src="../images/icon-groupo.png"
        alt="icon groupomania"
      />
      <nav>
        <ul>
          <li>
            <router-link class="router-style" to="/mon_profil">
              Mon profil
            </router-link>
          </li>
          <li>
            <router-link to="/" @click="logout" class="router-style">
              Deconnexion
            </router-link>
          </li>
          <li>
            <router-link to="/articles"> Articles </router-link>
          </li>
          <li>
            <router-link
              id="add-post"
              class="router-style"
              to="/ecrire-un-nouvel-article"
            >
              Ajouter un article
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div id="post-container">
      <!-- Affichage d'un article -->
      <h1>{{ post.title }}</h1>
      <div id="post-content">{{ post.content }}</div>

      <!-- Affichage du btn supp si l'userId est le même que celui qui est
      dans le localStorage + btn lié avec l'événement onclick-->
      <div v-if="storage.userId === post.userId || user.isAdmin == true">
        <button @click="deletePost">Supprimer</button>
      </div>

      <!-- Ecrire un commentaire, afficher la liste des commentaires et
      supprimer le commentaire si le ce dernier possède le même userId que l'utilisateur 
      connecté -->

      <!-- Ecrire un commentaire -->
      <div id="create-comment">
        <div>
          <textarea
            id="textarea-comment"
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
      <ul id="comment-container">
        <li
          v-for="comment in post.comments"
          :key="comment.id"
          id="comment-list"
        >
          <div>{{ comment.content }}</div>

          <!-- Affichage du btn supp si l'userId est le même que celui qui est
             dans le localStorage + btn lié avec l'évenement onclick -->
          <div v-if="storage.userId === comment.userId || user.isAdmin == true">
            <button id="delete-comment" @click="deleteComment(comment)">
              Supprimer
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PostRoutes from "../services/auth.posts";
import CommentsRoutes from "../services/auth.comments";
import userRoutes from '../services/auth.user';
import swal from "sweetalert";

export default {
  name: "OnePost",
  data() {
    return {
      //tableau des commentaires, objet contenant l'id et le contenu d'un com
      //l'article se trouve dans un objet, et le storage qui contiendra le localStorage
      storage: JSON.parse(localStorage.getItem("groupomania-user")),
      post: {},
      comments: [],
      comment: {
        id: "",
        content: "",
      },
      user: ""
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
      swal({
        text: "Voulez-vous supprimer votre article ?",
        buttons: true,
      }).then((willDelete) => {
        if (willDelete) {
          PostRoutes.delete(this.post.id)
            .then(() => {
              swal("Article supprimé !");

              //Redirection vers la page qui contient tous les articles
              this.$router.push({ name: "AllPosts" });
            })
            .catch((error) => {
              console.log(error);
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
    displayAllComments() {
      CommentsRoutes.getAll()
        .then((res) => {
          this.comments = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // //Suppression des com

    deleteComment(comment) {
      swal({
        text: "Voulez-vous supprimer votre commentaire ?",
        buttons: true,
      }).then((willDelete) => {
        if (willDelete) {
          CommentsRoutes.delete(this.post.id, comment.id)
            .then(() => {
              swal("Commentaire supprimé !");
              this.$router.go();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          swal("Votre commentaire n'a pas été supprimé!");
        }
      });
    },

    getUser(id) {

      let storageUser = JSON.parse(localStorage.getItem("groupomania-user"));
      id = storageUser.userId;
      userRoutes.get(id)
          //Création d'un localStorage qui enregistre les données
          //Puis la page est redirigée vers les articles
          .then((res) => {
            this.user = res.data.user;
          })
          .catch((error) => {
            console.log(error);
          });
    },

    //Déconnexion en retirant du localStorage l'utilisateur (userId et token)
    //Redirection vers la page de connexion
    logout() {
      localStorage.removeItem("groupomania-user");
    },
  },
  //La fonction qui récupère l'article est montée dans le DOM
  //qui prend en paramètre un valeur dynamique qui mène à la route 'articles/:id'
  mounted() {
    this.getOnePost(this.$route.params.id);
    this.getUser(this.$route.params.id);
    this.displayAllComments();
  },
};
</script>

<style>
* {
  text-decoration: none;
  list-style-type: none;
}
#post-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#post-content {
  background-color: honeydew;
  width: 500px;
  padding: 30px;
  margin: 20px;
  border-radius: 20px;
  box-shadow: rgb(230, 228, 228) 0px 5px 10px;
}
#comment-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
}
#create-comment {
  margin: 20px;
}
#textarea-comment {
  width: 500px;
}
#comment-list {
  padding: 10px;
  border-radius: 10px;
  box-shadow: gray 0px 5px 10px;
  background-color: gainsboro;
  margin: 10px;
  width: 500px;
  height: 60px;
}
button {
  margin: 10px;
  padding: 10px;
  border-radius: 15px;
}
#delete-comment {
  margin: 5px;
  padding: 5px;
}
@media all and (max-width:700px) {
  #post-container {
   margin: 0;
  }
  #post-content {
  width: 300px;
}
#comment-list {
  width: 300px;
}
#textarea-comment {
  width: 300px;
}
}
</style>