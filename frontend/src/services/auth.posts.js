import axios from "./http-common";

class PostRoutes {
  getAll() {
    const token = JSON.parse(localStorage.getItem("groupomania")).token
    return axios.get("http://localhost:3000/api/articles/read-all", {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  }

  get(id) {
    const token = JSON.parse(localStorage.getItem("groupomania")).token
    return axios.get(`http://localhost:3000/api/articles/read-one/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  create(data) {
    const token = JSON.parse(localStorage.getItem("groupomania")).token
    return axios.post("/articles", data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  update(id, data) {
    const token = JSON.parse(localStorage.getItem("groupomania")).token
    return axios.put(`/articles/${id}`, data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  delete(id) {
    const token = JSON.parse(localStorage.getItem("groupomania")).token
    return axios.delete(`/articles/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
}

export default new PostRoutes();