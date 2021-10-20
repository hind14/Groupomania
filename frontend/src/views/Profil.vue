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
            <router-link to="/" @click="logout" class="router-style"
              >Deconnexion</router-link
            >
          </li>
          <li>
            <router-link id="add-post" to="/ecrire-un-nouvel-article"
              >Ajouter un article</router-link
            >
          </li>
          <li>
            <router-link to="/articles"> Articles </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <h1>Bienvenue</h1>
    <button v-on:click="deleteAccount">Supprimer mon compte</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserProfil",
  data() {
    return {
      user: {
      id: "",
      name: ""
      }
    };
  },
  methods: {
    deleteAccount(id) {
      const token = JSON.parse(localStorage.getItem("groupomania")).token
      axios.delete(`http://localhost:3000/api/profil/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
      })
        .then(() => {
          this.$router.push("connexion");
          localStorage.removeItem("groupomania");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>