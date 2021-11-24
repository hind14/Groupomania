//Chargement du fichier .env (pour la clé jwt)
require('dotenv').config();

// Appel d'express et de cors 
const express = require('express');
const cors = require('cors');

// Appel des routes utilisateurs, articles et commentaires
const userRoutes = require('./routes/user.routes');
const postsRoutes = require('./routes/posts.routes');
const commentsRoutes = require('./routes/comments.routes');
// const adminRoutes = require('./routes/admin.routes');

// Utilisation du framework Express pour faire fonctionner Node.js
const app = express();
app.use(express.json());
app.use(cors());

// Variable qui contient les models de la base de donnée mysql
const db = require("./models");

// Appel d'helmet qui permet de sécuriser Express en créant plusieurs entêtes HTTP.
const helmet = require('helmet');
app.use(helmet());

// Middleware d'autorisation qui permet à l'application d'accèder à l'API depuis n'importe quelle origine,
// d'utiliser certaines entêtes mentionnées aux requêtes envoyées vers l'API
// et d'envoyer des requêtes avec les méthodes ci-dessous
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Configuration des routes utilisateurs, articles et commentaires avec l'API
app.use('/api/auth', userRoutes);
app.use('/api/user', userRoutes);
app.use('/api/articles', postsRoutes);
app.use('/api/articles', commentsRoutes);

db.sequelize.sync({ force: false });

module.exports = app;