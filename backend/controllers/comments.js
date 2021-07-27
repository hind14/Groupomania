const db = require("../models");
const Comment = db.comments;

exports.createcCmment = (req, res, next) => {
  const comment = { content: req.body.content}
  Comment.create(comment)
    .then(() => res.status(201).json({ message: 'commentaire enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  Comment.findOne({ id: req.params.id })
    .then((comment) => {
        comment.delete({ id: req.params.id })
          .then(() => res.status(200).json({ message: 'commentaire supprimé !' }))
          .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};