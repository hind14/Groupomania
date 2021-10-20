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
  Post.findOne({ where: {id: req.params.id }})
    .then((post) => {
      res.status(200).json(post); 
    })
    .catch((error) => {
       res.status(404).json({ error: error});
    });
};


// exports.deletePost = (req, res, next) => {
//   Post.detroy({ where: {id: req.params.id }})
//     .then((post) => {
//       res.status(200).json(post); 
//         })
//     .catch((error) => {
//       res.status(404).json({ error: error});
//    });
// };