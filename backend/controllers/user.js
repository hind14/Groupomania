const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;
const passwordValidator = require('../middleware/password-validator');

//CRUD

//Fonction d'inscription qui crée un utilisateur et stocke dans un objet
//le prénom, nom, email et mdp d'un utilisateur, puis l'envoie dans la base de données
exports.signup = (req, res, next) => {
  if (!passwordValidator.validate(req.body.password)) {
    return res.status(401).json({ error: 'Mot de passe invalide !' });
  }
  //SÉCURITÉ --> Mdp haché 
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash
      })
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ error })
    });
};

//Fonction de connexion qui récupère l'email de la db et permet la connexion

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      //SÉCURITÉ --> Comparaison entre les mdp grâce à la fonction compare
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          //Si le mdp est différent alors afficher une erreur
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          //Sinon, autorisation
          //Création de userId gràce à l'id de l'utilsateur
          //SÉCURITÉ --> Création d'un token
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id, email: maskEmail(req.body.email) },
              process.env.jwtsecret,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => {
          return res.status(502).json({ error })
        }
        );
    })
    .catch(error => res.status(501).json({ error }));
};

//Fonction qui récupère les infos de l'utilisateur

exports.getUser = (req, res,next) => {
  const id = req.params.id;
  User.findOne({ 
    attributes: [ 'id', 'name', 'lastname', 'email', 'isAdmin', 'createdAt', 'updatedAt' ],
    where: { id: id  }
  })
  .then((user) => {
    res.status(200).json({user});
  })
  .catch(error => res.status(404).json({ error: 'Utilisateur non trouvé' }));
};

//Fonction qui permet à l'utilisateur de supprimer son compte

exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  User.findOne({ 
    attributes: [ 'id' ],
    where: { id: id  }
  })
  .then((user) => {
    User.destroy({where: {id: id}})
    res.status(200).json({message: 'Votre compte a été supprimé'});
  })
  .catch(error => res.status(500).json({ error: "une erreur s'est produite, le compte n'est pas supprimé" }));
};

//SÉCURITÉ --> Fonction faisant appel à la fc obfuscate pour cacher une partie de l'email
function maskEmail(email) {
  const mailParts = email.split('@');
  const partLeft = obfuscate(mailParts[0]);
  const partRight = obfuscate(mailParts[1]);
  return partLeft + '@' + partRight;
};

//Fonction qui obfusque / cache 
function obfuscate(strings) {
  let output = '';
  for (let i = 0; i < strings.length; i++) {
    if (i >= strings.length / 4) {
      output += '*';
    } else {
      output += strings[i];
    }
  }
  return output
};