<template>
  <div id="header">
     <img
      id="icon-groupo"
      src="../images/icon-groupo.png"
      alt="icon groupomania"
    />
    <nav>
      <ul>
        <li>
            <router-link class="router-style" to="/profile">Mon profil</router-link>
        </li>
        <li>
            <router-link @click.prevent="logout" class="router-style">Deconnexion</router-link>
        </li>
        <li>
            <router-link id="add-post" to="/ecrire-un-nouvel-article" >Ajouter un article</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Report",
  data() {
    return {};
  },
  methods: {
      logout() {
      localStorage.removeItem("groupomania-user");
      this.$router.push("connexion");
    }
  }
};
</script>