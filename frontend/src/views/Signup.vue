<template>
  <div class="signup">

     <router-link to="/"> Retour </router-link> <br/>

    <h1>Inscription</h1>
    <form  @submit.prevent="signup" id="form">
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

      <button>Inscription</button>
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
        .post("http://localhost:3000/api/auth/inscription", {
          email: this.email,
          password: this.password
        }) 
        .then(function (res) {
          console.log(res);
        this.$router.push("http://localhost:3000/api/articles");
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