import axios from "./http-common";

class UserRoutes {
    get(id) {
      const token = JSON.parse(localStorage.getItem("groupomania-user")).token;
      return axios.get(`/user/profile/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    }
  
    delete(id) {
      const token = JSON.parse(localStorage.getItem("groupomania-user")).token
      return axios.delete(`/user/profile/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    }
}
  
export default new UserRoutes();