<template>
  <div>
    <h1>Tous les articles à votre disposition</h1>
    <router-link to="/"> Retour </router-link> <br/>
    <router-link to="/ecrire-un-nouvel-article">Ajouter un article</router-link>
     
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(post, index) in posts"
          :key="index"
        >
          {{ post }}
        </li>
      </ul>
     <div v-if="currentPosts">
        <div>
          <label><strong>Titre:</strong></label> {{ currentPosts.title }}
        </div>
        <div>
           <label><strong>Contenu:</strong></label>
           {{ currentPosts.content }}
        </div>
        <div>
          <label><strong>Statut:</strong></label> {{ currentPosts.published ? "Published" : "Pending" }}
        </div>

        <router-link to="/modifier-votre-article/" + currentPosts.id
        >
          Modidier votre article
        </router-link>
      </div>
      <div v-else>
        <br />
        <p>Il n'y a aucun article.</p> 
      </div> 
  </div>
</template>

<script>
import PostRoutes from "../services/Post-routes";

export default {
  name: 'AllPosts',
  data() { 
    return {
      posts: [],
      currentPosts: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrievePosts() {
      PostRoutes.getAll()
        .then(response => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error.response.data, 'erreur axios get');
        });
    },
    refreshList() {
      this.retrievePosts();
      this.currentPosts = null;
      this.currentIndex = -1;
    },
    setActivePost(post, index) {
      this.currentPosts = post;
      this.currentIndex = index;
    },
  },
  mounted() {
    this.retrievePosts();
    }
};
</script>

<style>
</style>