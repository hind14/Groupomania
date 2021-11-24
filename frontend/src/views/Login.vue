<template>
  <div class="login">
    <div id="header">
      <img
        id="icon-groupo"
        src="../images/icon-groupo.png"
        alt="icon groupomania"
      />
      <nav>
        <ul>
          <li>
            <router-link class="router-style" to="/"> Accueil </router-link>
          </li>
          <li>
            <router-link class="router-style" to="/inscription">
              Inscription
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <h1>Connexion</h1>
    <!-- Création d'un formulaire pour se connecter 
      Événement submit avec un prevent qui évite le chargement de la page
      Utilisation du v-model pour relier et mettre à jour les données (data)  -->
    <form @submit.prevent="login" id="form">
      <div class="signup-inputs">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          required="true"
        />
      </div>

      <div class="signup-inputs">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          required="true"
        />
      </div>

      <button>Se connecter</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "login",
  //Récupération du data grâce au v-model
  data() {
    return {
      email: "",
      password: "",
    };
  },
  //Appel d'axios pour consommer l'API ci-dessous
  //Envoi des données à l'API grâce à axios
  methods: {
    login() {
      axios
        .post("http://localhost:3000/api/auth/connexion", {
          email: this.email,
          password: this.password,
        })
        //Création d'un localStorage qui enregistre les données
        //Puis la page est rediriger vers les articles
        .then((res) => {
          localStorage.setItem("groupomania-user", JSON.stringify(res.data));
          this.$router.push("articles");
        })
        .catch((error) => {
          swal("Votre email ou mot de passe est incorrect, veulliez réessayer.")
          console.log(error);
        });
    },
  },
};
</script>


<style>
</style>