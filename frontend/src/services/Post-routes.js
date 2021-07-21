import axios from "axios";

class PostRoutes {
    getAll() {
      return axios.get("/tous-les-articles");
    }
  
    get(id) {
      return axios.get(`/tous-les-articles/${id}`);
    }
  
    create(createPost) {
      return axios.post("/tous-les-articles", createPost);
    }
  
    update(id, createPost) {
      return axios.put(`/tous-les-articles/${id}`, createPost);
    }
  
    delete(id) {
      return axios.delete(`/tous-les-articles/${id}`);
    }
}
  
export default new PostRoutes();