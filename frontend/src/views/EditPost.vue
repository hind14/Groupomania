<template>
  <div></div>
  <!-- <div v-if="currentPost" class="edit-form">
    <h1>Article</h1>
    <form>
      <div class="form-group">
        <label for="title">Titre</label>
        <input 
        type="text"
        class="form-control" 
        id="title"
        v-model="currentPost.title"
        />
      </div>
      <div class="form-group">
        <label for="content">contenu</label>
        <input 
        type="text" 
        class="form-control" 
        id="content"
        v-model="currentPost.content"
        />
      </div>

    </form>

    <button class="badge badge-danger mr-2"
      @click="deletePost"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updatePost"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Veuillez choisir un article...</p>
  </div> -->
</template>

<script>
// import PostsRoutes from "../services/Post-routes";

export default {
  name: "post",
  data() {
    return {};
  },
};
//       currentPost: null,
//       message: ''
//     };
//   },
//   methods: {
//     getPost(id) {
//       PostsRoutes.get(id)
//         .then(response => {
//           this.currentPost = response.data;
//           console.log(response.data);
//         })
//         .catch(e => {
//           console.log(e);
//         });
//     },

//
//       PostsRoutes.update(this.currentPost.id, data)
//         .then(response => {
//           console.log(response.data);
//         })
//         .catch(e => {
//           console.log(e);
//         });
//     },

//     updatePost() {
//       PostsRoutes.update(this.currentPost.id, this.currentPost)
//         .then(response => {
//           console.log(response.data);
//           this.message = 'The post was updated successfully!';
//         })
//         .catch(e => {
//           console.log(e);
//         });
//     },

//     deletePost() {
//       PostsRoutes.delete(this.currentPost.id)
//         .then(response => {
//           console.log(response.data);
//           this.$router.push({ name: "posts" });
//         })
//         .catch(e => {
//           console.log(e);
//         });
//     }
//   },
//   mounted() {
//     this.message = '';
//     this.getPost(this.$route.params.id);
//   }
// };
</script>

<style>
</style>