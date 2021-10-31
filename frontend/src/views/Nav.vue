<!-- <template>
  <div id="header">
     <img
      id="icon-groupo"
      src="../images/icon-groupo.png"
      alt="icon groupomania"
    />
    <nav>
      <ul>
        <li>
            <router-link class="router-style" to="/profil">Mon profil</router-link>
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
  name: "Nav",
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


<style>
body {
  margin: 0;
  padding: 0;
}
#header {
  display: flex;
  justify-content: space-between;
  background-color: #deebff;
}
#header ul {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
}
#header #icon-groupo {
  width: 200px;
  padding: 0;
  margin: 10px 0 0 10px;
}
#header ul li {
  list-style: none;
  padding: 10px;
}
.router-style {
  text-decoration: none;
}
#intro {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 20px;
  padding: 20px;
  margin: 20px;
}

@media all and (max-width:700px)
{
  #header #icon-groupo {
    width: 120px;
  }
  #header ul li {
  list-style: none;
  padding: 10px 5px 10px 5px;
}
}
</style> -->