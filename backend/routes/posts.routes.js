express = require('express');
const router = express.Router();

//Appel de la variable contenant l'autorisation (token) permettant la vérification de l'utilisateur 
const auth = require('../middleware/auth');

//Appel de la variable contenant les fonctions du CRUD
const postCtrl = require('../controllers/posts');

//Utilisation du router de vue.js et paramétrage des différentes URL
//pour envoyer un article, récupérer les articles, récupérer un article avec l'id et le supprimer
router.get('/read-all', auth, postCtrl.getAllPosts);
router.post('/', auth, postCtrl.createPost);
router.get('/read-one/:id', auth, postCtrl.getOnePost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;
