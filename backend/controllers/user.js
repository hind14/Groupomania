const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../models');
const db = require('../models');
const User = db.user;

exports.signup = (req, res, next) => {
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

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
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

// DELETE !

exports.deleteUser = (req, res, next) => {
  User.findOne ({where: { userId: req.body.id }}) 
  .then((user) => {
    user.destroy({ user })
      .then(() => res.status(200).json({ message: 'compte suprimé !' }))
      .catch(error => res.status(400).json({ error }));
})
.catch(error => res.status(500).json({ error }));
}

function maskEmail(email) {
  const mailParts = email.split('@');
  const partLeft = obfuscate(mailParts[0]);
  const partRight = obfuscate(mailParts[1]);
  return partLeft + '@' + partRight;
};

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