const post = require('../models/posts.model');

exports.createpost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new post(postObject);
  post.create()
    .then(() => res.status(201).json({ message: 'post enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getOnepost = (req, res, next) => {
  post.findOne({ _id: req.params.id })
    .then((post) => { res.status(200).json(post); })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};

exports.modifypost = (req, res, next) => {
  const postObject = req.file ?
    {
      ...JSON.parse(req.body.post)
    } : { ...req.body };
  post.update({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'post modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deletepost = (req, res, next) => {
  post.findOne({ _id: req.params.id })
    .then((post) => {
        post.delete({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'post supprimé !' }))
          .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllposts = (req, res, next) => {
  post.findAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};
