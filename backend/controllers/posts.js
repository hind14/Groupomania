const db = require("../models");
const Post = db.posts;
const Comment = db.comments;
const User = db.user;

//CRUD

//Création d'un article
exports.createPost = async (req, res, next) => {
  const post = { title: req.body.title, content: req.body.content, userId: req.body.userId }
 
  if (req.body.title === "" || req.body.content === "") {
    return res.status(400).json({ error: "Merci de remplir tous les champs." });
  }

  Post.create(post)
    .then(() => res.status(201).json({ message: 'Post enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

//Récupération de tous les articles
exports.getAllPosts = async (req, res, next) => {
  Post.findAll({ include: User.name })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

//Récupération d'un article en cherchant son id (where)
exports.getOnePost = async (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Comment,
        as: "comments"
      },
      {
        model: User,
        as: "user"
      }]
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};


//Suppression d'un article en cherchant son id (where)

exports.deletePost = async (req, res, next) => {
  const userId = req.params.userId;
  if(Post.userId === userId || User.isAdmin === true) {
    Post.destroy({ where: { id: req.params.id } })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
  }
  else {
    console.log(error)
  }
};
