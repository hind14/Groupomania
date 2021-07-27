const db = require("../models");
const Post = db.posts;

exports.createPost = (req, res, next) => {
  const post = {title: req.body.title, content: req.body.content, userId: req.body.userId}
  Post.create(post)
    .then(() => res.status(201).json({ message: 'post enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllposts = (req, res, next) => {
  Post.findAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.getOnePost = (req, res, next) => {
  Post.findByPk({ id: req.params.id })
    .then((post) => { res.status(200).json(post); })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};

exports.modifyPost = (req, res, next) => {
  const postObject = req.file ?
    {
      ...JSON.parse(req.body.post)
    } : { ...req.body };
  Post.update({ id: req.params.id }, { ...postObject, id: req.params.id })
    .then(() => res.status(200).json({ message: 'post modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.detroy({ id: req.params.id })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id
      });
    })
};