const db = require("../models");
const Post = db.posts;

exports.createPost = (req, res, next) => {
  console.log(req.body);
  const post = {title: req.body.title, content: req.body.content}
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
  Post.findOne({ _id: req.params.id })
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
  Post.findOne({ id: req.params.id })
    .then((post) => {
        post.delete({ id: req.params.id })
          .then(() => res.status(200).json({ message: 'post supprimé !' }))
          .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};