<template>
  <div class="signup">

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
            <router-link class="router-style" to="/connexion"> Connexion </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div class="form-style">
      <h1>N'attendez plus, inscrivez-vous !</h1>
      <form @submit.prevent="signup" id="form">
        <label for="name">Prénom</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="name"
          required="true"
        />
        <br />
        <label for="lastname">Nom</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          v-model="lastname"
          required="true"
        />
        <br />

        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          required="true"
        />
        <br />

        <label for="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          required="true"
        />
        <br />

        <button id="signup-style">Inscription</button>
      </form>
    </div>
    <div>
      Déja membre?
      <router-link to="/connexion">Connectez-vous !</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "signup",
  data() {
    return {
      name: "",
      lastname: "",
      email: "",
      password: ""
    };
  },
  methods: {
    signup() {
      axios
        .post("http://localhost:3000/api/auth/inscription", {
          name: this.name,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          this.$router.push("connexion");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
#home {
  margin: 20px;
}
#header {
  display: flex;
  justify-content: space-between;
  background-color: #deebff;
}
.form-style {
  padding: 25px;
  margin: 20px;
  border: solid 2px grey;
  border-radius: 20px;
  background-color: #deebff;
}
h1 {
  font-size: 25px;
}
label {
  padding: 10px;
}
input {
  margin: 10px 0;
}
#signup-style {
  padding: 10px;
  border-radius: 20px;
}
</style>