const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/status', (req, res) => {
    res.send({
        message: 'Hello groupomania!'
    })
})

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;