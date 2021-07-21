<template>
  <div class="signup">
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

      <button @click="signup">Inscription</button>
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
    async signup() {
      await axios
        .post("http://localhost:3000/api/auth/signup", {
          email: this.email, password: this.password
        }) 
        .then(function () {
        this.$router.push("tous-les-articles")
        })
        .catch(function (error) {
          console.log(error)
        });
    },
  },
};
</script>


<style>
</style>