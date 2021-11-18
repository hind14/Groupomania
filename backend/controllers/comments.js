const db = require("../models");
const Comment = db.comments;
const Post = db.posts;
const User = db.user;

//CRUD

//CREATE 

exports.createComment = (req, res, next) => {
  const comment = { content: req.body.content, userId: req.body.userId, postId: req.body.postId}
  Comment.create(comment)
    .then(() => res.status(201).json({ message: 'commentaire enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

//READ

exports.getAllComments = (req, res, next) => { 
  Comment.findAll({
    where: { postId: req.params.id}
  })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

//DELETE 

exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: {postId: req.params.postId, id: req.params.id, userId: req.params.userId }})
  .then((comment) => {
    res.status(200).json(comment); 
      })
  .catch((error) => {
    res.status(404).json({ error: error});
 });
};