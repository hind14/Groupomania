<template>
  <div class="login">
    <router-link to="/"> Retour </router-link> <br />

    <h1>Connexion</h1>
    <form @submit.prevent="login" id="form">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        v-model="email"
        required="true"
      />
      <br />

      <label for="password">Mot de passe:</label>
      <input
        type="password"
        id="password"
        name="password"
        v-model="password"
        required="true"
      />
      <br />

      <button>Se connecter</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:3000/api/auth/connexion", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("groupomania", JSON.stringify(res.data));
          this.$router.push("articles");
        })
        .catch((error) => {
          console.log(error, 'erreur connexion login.vue');
        });
    },
  },
};
</script>


<style>
</style>