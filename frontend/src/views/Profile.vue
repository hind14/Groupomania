<template>
  <div>
    <div id="header">
      <img
        id="icon-groupo"
        src="../images/icon-groupo.png"
        alt="icon groupomania"
      />
      <nav>
        <ul>
          <li>
            <router-link to="/" @click="logout" class="router-style">
              Deconnexion
            </router-link>
          </li>
          <li>
            <router-link class="router-style" id="add-post" to="/ecrire-un-nouvel-article">
              Ajouter un article
            </router-link>
          </li>
          <li>
            <router-link class="router-style" to="/articles"> Articles </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <h1>Bienvenue {{ user.name }} {{ user.lastname }}</h1>
    <div>Email: {{ user.email }}</div>
    <div>
      Administrateur :
      <span v-if="user.isAdmin == true"> Oui</span>
      <span v-else> Non</span>
    </div>
    <button @click="deleteAccount">Supprimer mon compte</button>
  </div>
</template>

<script>
import userRoutes from "../services/auth.user";
import swal from "sweetalert";

export default {
  name: "UserProfile",
  data() {
    return {
      user: " ",
    };
  },
  methods: {
    //Récupération des données de l'utilisateur grâce à son id
    getUser(id) {
      let storageUser = JSON.parse(localStorage.getItem("groupomania-user"));
      id = storageUser.userId;
      userRoutes
        .get(id)
        //Création d'un localStorage qui enregistre les données
        //Puis la page est rediriger vers les articles
        .then((res) => {
          this.user = res.data.user;
        })
        .catch((error) => {
          console.log(error, "erreur Profile.vue");
        });
    },

    /* Suppression du compte */

    deleteAccount(id) {
      let storageUser = JSON.parse(localStorage.getItem("groupomania-user"));
      id = storageUser.userId;

      swal({
        text: "Etes-vous sûr de supprimer votre compte ?",
        buttons: true,
      }).then((willDelete) => {
        if (willDelete) {
          userRoutes
            .delete(id)
            .then(() => {
              swal("Compte supprimé !");
              this.$router.push("connexion");
              localStorage.removeItem("groupomania-user");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          swal("Votre compte n'a pas été supprimé!");
        }
      });
    },

    /* Déconnexion */

    logout() {
      localStorage.removeItem("groupomania-user");
      this.$router.push("connexion");
    },
  },
  mounted() {
    this.getUser(this.$route.params.id);
  },
};
</script>

<style>
.router-style {
  color : white;
}
</style>