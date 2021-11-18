import axios from "./http-common";

//Fonction qui crée un article, récupère tous les articles, récp un article 
//grâce à son id et supprime l'article grâce à l'id
//Utilisation d'axios pour envoyer des requête http
//Récupération du token du localStorage afin d'autoriser les actions
class PostRoutes {
  getAll() {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.get("/articles", {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  }

  get(id) {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.get(`/articles/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  create(data) {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.post("/articles", data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  delete(id) {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.delete(`/articles/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
}

export default new PostRoutes();