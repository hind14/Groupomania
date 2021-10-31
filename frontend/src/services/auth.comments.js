// import axios from "./http-common";

// class CommentsRoutes {
//   getAll(commentId) {
//     const token = JSON.parse(localStorage.getItem("groupomania-user")).token
//     return axios.get(`http://localhost:3000/api/comments/${postId}`,  {
//       headers: {
//         authorization: `Bearer ${token}`
//       }
//     })
//   }

//   create(commentId, data) {
//     const token = JSON.parse(localStorage.getItem("groupomania-user")).token
//     return axios.post(`/comments/${postId}`, data, {
//       headers: {
//         authorization: `Bearer ${token}`
//       }
//     })
//   }

//   delete(commentId) {
//     const token = JSON.parse(localStorage.getItem("groupomania-user")).token
//     return axios.delete(`/comment/${postId}`, {
//       headers: {
//         authorization: `Bearer ${token}`
//       }
//     })
//   }
// }

// export default new CommentsRoutes();