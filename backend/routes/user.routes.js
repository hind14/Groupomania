const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/inscription', userCtrl.signup);
router.post('/connexion', userCtrl.login);
router.delete('/profil/:id', auth, userCtrl.deleteUser);

module.exports = router;