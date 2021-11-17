const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

//Utilisation du router de vue.js et paramétrage des différentes URL
//pour l'inscription, la connexion et la suppression du compte
router.post('/inscription', userCtrl.signup);
router.post('/connexion', userCtrl.login);
router.get('/profile/:id', auth, userCtrl.getUser);
router.delete('/profile/:id', auth, userCtrl.deleteUser);
module.exports = router;