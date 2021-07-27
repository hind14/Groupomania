import axios from "./http-common";

class CommentsRoutes {
  create(data) {
    const token = JSON.parse(localStorage.getItem("groupomania")).token
    return axios.post("/articles", data, {
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

export default new CommentsRoutes();