import axios from "axios";

//Utilisation d'axios, création d'une nouvelle instance d'axios
//avec un tronc commun qui récupère l'URL de l'API (backend)

export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json"
  }
});