const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;

//CRUD

//Fonction d'inscription qui crée un utilisateur et stocke dans un objet
//le prénom, nom, email et mdp d'un utilisateur 
exports.signup = (req, res, next) => {

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

//Fonction de connexion qui récupère l'email

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      //SÉCURITÉ --> Comparaison entre les mdp
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

//Fonction qui permet à l'utilisateur de supprimer son compte

// exports.deleteUser = (req, res, next) => {
//   User.findOne ({where: { userId: req.body.id }}) 
//   .then((user) => {
//     user.destroy({ user })
//       .then(() => res.status(200).json({ message: 'compte suprimé !' }))
//       .catch(error => res.status(400).json({ error }));
// })
// .catch(error => res.status(500).json({ error }));
// }

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