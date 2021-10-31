const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//Utilisation du router de vue.js et paramétrage des différentes URL
//pour l'inscription, la connexion et la suppression du compte
router.post('/inscription', userCtrl.signup);
router.post('/connexion', userCtrl.login);
// router.delete('/profil/:id', auth, userCtrl.deleteUser);

module.exports = router;