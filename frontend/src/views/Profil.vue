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
    <h1> Bienvenue</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
};
</script>

<style>
</style>