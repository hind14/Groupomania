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
            <router-link class="router-style" to="/inscription"> Inscription </router-link>
          </li>
        </ul>
      </nav>
    </div>


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
  name: "login",
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
          console.log(error);
        });
    },
  },
};
</script>


<style>
</style>