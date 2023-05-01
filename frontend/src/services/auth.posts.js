import axios from "./http-common";

const token = JSON.parse(localStorage.getItem("groupomania-user")).token;
const articlesPath = "/articles";
const communHeaders =  {headers: {
  authorization: `Bearer ${token}`
}}

//Fonction qui crée un article, récupère tous les articles, récp un article 
//grâce à son id et supprime l'article grâce à l'id
//Utilisation d'axios pour envoyer des requête http
//Récupération du token du localStorage afin d'autoriser les actions
class PostRoutes {
  getAll() {
    return axios.get(articlesPath, communHeaders);
  }

  get(id) {
    return axios.get(`${articlesPath}/${id}`, communHeaders)
  }

  create(data) {
    return axios.post(articlesPath , data, communHeaders)
  }

  delete(id) {
    return axios.delete(`${articlesPath}/${id}`, communHeaders)
  }
}

export default new PostRoutes();
