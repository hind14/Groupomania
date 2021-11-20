import axios from "./http-common";

class CommentsRoutes {
  create(data) {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.post(`/articles/:id`, data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  getAll() {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.get(`/articles/:id`,  {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  delete(post, comment) {
    const token = JSON.parse(localStorage.getItem("groupomania-user")).token
    return axios.delete('/articles/' + post + '/comment/' + comment, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
}

export default new CommentsRoutes();