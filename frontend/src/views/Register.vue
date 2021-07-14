<template>
  <div class="Register">
    <h1>Inscription</h1>
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

      <button @click="register">Inscription</button>
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
    async register() {
      axios
        .post("http://localhost:3000/register", {
          email: this.email, password: this.password
        }) 
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>


<style>
</style>