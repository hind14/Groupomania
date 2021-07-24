require('dotenv').config();

const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user.routes');
const postsRoutes = require('./routes/posts.routes');

const app = express();
app.use(express.json());
app.use(cors());

const db = require("./models");

const helmet = require('helmet');
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/auth', userRoutes);
app.use('/api/articles', postsRoutes);

db.sequelize.sync({force: false});

module.exports = app;