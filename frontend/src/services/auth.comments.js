import axios from "./http-common";

const token = JSON.parse(localStorage.getItem("groupomania-user")).token;
const communHeaders =  {headers: {
  authorization: `Bearer ${token}`
}}

class CommentsRoutes {
  create(data) {
    return axios.post(`/articles/:id`, data, communHeaders)
  }

  getAll() {
    return axios.get(`/articles/:id`,  communHeaders)
  }

  delete(post, comment) {
     axios.delete(`/articles/${post}/comment/${comment}`, communHeaders)
return  }
}

export default new CommentsRoutes();
