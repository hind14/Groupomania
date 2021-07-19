<template>
  <div class="login">
    <h1>Connexion</h1>
    <form id="form">
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

      <button @click="login">Se connecter</button>
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
    async login() {
      axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then( (res) => {
          console.log(res);
          this.$router.push("articles")
})
        .catch( (error) => {
          console.log(error);
        });
    },
  },
};
</script>


<style>
</style>