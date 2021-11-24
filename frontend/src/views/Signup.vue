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
            <router-link class="router-style" to="/connexion">
              Connexion
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div id="form-style">
      <h1>N'attendez plus, inscrivez-vous !</h1>
      <!-- Création d'un formulaire pour s'inscrire
        Événement submit avec un prevent qui évite le rechargement de la page
        Utilisation du v-model pour relier et mettre à jour les données (data)  -->
      <form @submit.prevent="signup" id="form">
        <div class="signup-inputs">
          <label for="name">Prénom</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="name"
            required="true"
          />
        </div>
        <div class="signup-inputs">
          <label for="lastname">Nom</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            v-model="lastname"
            required="true"
          />
        </div>
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

        <button id="signup-style">Inscription</button>
      </form>
      <div>
        Déja membre?
        <router-link to="/connexion">Connectez-vous !</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "signup",
  //Récupération du data grâce au v-model
  data() {
    return {
      name: "",
      lastname: "",
      email: "",
      password: "",
    };
  },
  //Appel d'axios pour consommer l'API ci-dessous
  //Envoi des données à l'API grâce à axios
  methods: {
    signup() {
      axios
        .post("http://localhost:3000/api/auth/inscription", {
          name: this.name,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        })
        //Redirection vers la page connexion
        .then(() => {
          swal("Bravo ! Vous êtes inscris !");
          this.$router.push("connexion");
        })
        .catch((error) => {
          console.log(error)
          swal("Votre mot de passe doit contenir au minimum huit caractères dont une majuscule et deux chiffres")
        });
    },
  },
};
</script>

<style>
.signup {
  display: flex;
  flex-direction: column;
}
#form-style {
  align-self: center;
  width: 500px;
  padding: 25px;
  margin: 50px;
  border: solid 2px grey;
  border-radius: 20px;
   box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
h1 {
  font-size: 25px;
}
#form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signup-inputs {
  display: flex;
  flex-direction: row;
  width: 300px;
  margin: 0;
}
label {
margin: auto;
padding: 5px;
font-weight: bold;
}
input {
  margin: 10px 0;
  border: darkblue 1px solid;
  border-radius: 6px;
  padding: 5px;
}
button {
  margin: 20px;
  padding: 10px;
  border-radius: 15px;
  align-self: center;
  margin-bottom: 10px;
}
@media all and (max-width: 700px) {
  #form-style {
    width: 250px;
    height: 450px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    margin: auto;
  }
  .signup-inputs {
    flex-direction: column;
    width: 200px;
  }
  h1 {
    font-size: 20px;
  }
}
</style>