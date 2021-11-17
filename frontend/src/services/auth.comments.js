import axios from "./http-common";

class CommentsRoutes {
  create(data) {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.post(`/articles/read-one/:id/`, data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  getAll() {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.get(`/articles/read-one/:id/`,  {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  delete() {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.delete(`/articles/read-one/:id/`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
}

export default new CommentsRoutes();