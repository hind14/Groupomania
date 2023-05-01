import axios from "./http-common";

const token = JSON.parse(localStorage.getItem("groupomania-user")).token;
const communHeaders =  {headers: {
  authorization: `Bearer ${token}`
}}
const userPath = "/user/profile"

class UserRoutes {
    get(id) {
      return axios.get(`${userPath}/${id}`, communHeaders )
    }
  
    delete(id) {
      return axios.delete(`${userPath}/${id}`, communHeaders)
    }
}
  
export default new UserRoutes();