const db = require("../models");
const Comment = db.comments;
const Post = db.posts;
const User = db.user;

//CRUD

//CREATE 

exports.createComment = async (req, res, next) => {
  const comment = {
    content: req.body.content,
    userId: req.body.userId,
    postId: req.body.postId}
  Comment.create(comment)
    .then(() => res.status(201).json({ message: 'commentaire enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

//READ

exports.getAllComments = async (req, res, next) => { 
  Comment.findAll({
    where: { postId: req.params.id}, 
    include: [
        {
          model: User,
          as: "user"
        }
    ]
  })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

//DELETE 

exports.deleteComment = async (req, res, next) => {
  const userId = req.params.userId;
  if(Comment.userId === userId || User.isAdmin == true) {
  Comment.findOne({
    where: {
      postId: req.params.postId,
      id: req.params.id,
    }, 
  })
  .then((comment) => {
    if(!comment) {
      res.status(400).json({error: "Vous n'avez pas l'autorisation"}); 
    }
    comment.destroy()
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
    .catch(error => res.status(400).json({ error }))
      })
  .catch((error) => {
    res.status(404).json({ error: error});
 });
}
};
