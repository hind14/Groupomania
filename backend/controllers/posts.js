const db = require("../models");
const Post = db.posts;

//CRUD

//Création d'un article
exports.createPost = (req, res, next) => {
  const post = {title: req.body.title, content: req.body.content, userId: req.body.userId}
  Post.create(post)
    .then(() => res.status(201).json({ message: 'Post enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

//Récupération de tous les articles
exports.getAllposts = (req, res, next) => {
  Post.findAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

//Récupération d'un article en cherchant son id (where)
exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: {id: req.params.id }})
    .then((post) => {
      res.status(200).json(post); 
    })
    .catch((error) => {
       res.status(404).json({ error: error});
    });
};

//Suppression d'un article en cherchant son id (where)
exports.deletePost = (req, res, next) => {
  Post.destroy({ where: {id: req.params.id }})
    .then((post) => {
      res.status(200).json(post); 
        })
    .catch((error) => {
      res.status(404).json({ error: error});
   });
};