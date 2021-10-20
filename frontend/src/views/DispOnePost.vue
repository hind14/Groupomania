<template>
  <div class="my-post">
    <div id="header">
      <img
        id="icon-groupo"
        src="../images/icon-groupo.png"
        alt="icon groupomania"
      />
      <nav>
        <ul>
          <li>
            <router-link class="router-style" to="/profil"
              >Mon profil
            </router-link>
          </li>
          <!-- <li>
            <router-link to="/" @click="logout" class="router-style">Deconnexion</router-link>
          </li> -->
          <li>
            <router-link to="/articles"> Articles </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div>
      <h1>{{ post.title }}</h1>
      <div>{{ post.content }}</div>

      <div v-if="storage.userId === post.userId">
        <button @click="deletePost">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script>
import PostRoutes from "../services/auth.posts";

export default {
  name: "OnePost",
  data() {
    return {
      storage: "",
      post: {}
    };
  },
  methods: {
    getOnePost(id) {
      PostRoutes.get(id)
        .then((res) => {
          this.post = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  /* deletePost(id) {
    PostRoutes.delete(id)
      .then(() => {
        this.$router.push("articles/read-all");
      })
      .catch((error) => {
        console.log(error, 'delete post');
      });
    }, */
  mounted() {
    this.getOnePost(this.$route.params.id);
    this.storage = JSON.parse(localStorage.getItem("groupomania"));
  },
  // destroyed() {
  //   this.deletePost();
  // }
};
</script>

<style>
#com-list {
  border: 2px solid black;
  background-color: cadetblue;
}
</style>