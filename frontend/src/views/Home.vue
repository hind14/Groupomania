<template>
  <div class="home">
    <div id="header"> 
      <img
        id="icon-groupo"
        src="../images/icon-groupo.png"
        alt="icon groupomania"
      />
      <nav>
        <ul>
          <li>
            <router-link class="router-style" to="/inscription" >Inscription</router-link >
          </li>
          <li>
            <router-link class="router-style" to="/connexion">Connexion</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <router-view />

    <div id="intro">
      Bienvenue sur Groupomania, une entreprise qui s'investie dans le bien être
      de ses salairés. Inscrivez-vous afin d'écrire et de partager vos articles
      avec vos collègues !
    </div>
  </div>
</template>

<script>
</script>

<style>
* {
  text-decoration: none;
  list-style-type: none;
}
body {
  margin: 0;
  padding: 0;
}
.home {
  display: inline;
}
#header {
  display: flex;
  justify-content: space-between;
  background-color: #fd2d01;
  align-items: flex-start;
  flex-wrap: wrap;
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
  padding: 20px;
}
#intro {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 20px;
  padding: 20px;
  margin: 50px;
  font-size: 25px;
}
.router-style {
  color : white;
}
@media all and (max-width:700px)
{
  #header {
    margin: 0;
    padding: 0;
  }
  #header #icon-groupo {
    width: 200px;
  }
  #header ul li {
  position: relative;
  padding: 5px 5px 0px 5px;
  }
  #intro {
  width: 250px;
  height: 260px;
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
  }
}

</style>
