const db = require("../models");
const Comment = db.comments;

exports.getAllComments = (req, res, next) => {
  const postId = req.params.postId
  Comment.findAll({ where: {postId: postId }})
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.createComment = (req, res, next) => {
  const comment = { content: req.body.content}
  Comment.create(comment)
    .then(() => res.status(201).json({ message: 'commentaire enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

// exports.deleteComment = (req, res, next) => {
//   const postId = req.params.postId
//   Comment.findOne({ where: {postId: postId }})
//     .then((comment) => {
//         comment.destroy({ where: {postId: postId }})
//           .then(() => res.status(200).json({ message: 'commentaire supprimé !' }))
//           .catch(error => res.status(400).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error }));
// };