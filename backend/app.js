require('dotenv').config();

const express = require('express');
const cors = require('cors');

//const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user.routes');
const postsRoutes = require('./routes/posts.routes');

const app = express();
app.use(express.json());
app.use(cors());

const db = require("./models");
const Post = db.posts;

const helmet = require('helmet');
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/', (req, res, next) => {
  res.send({
    message : 'Welcome to Groupomania'
  })
});

app.post('/register', (req, res, next) => {
  console.log(req.body)
  res.send({
      message: `Hello ${req.body.email}! Your register was registered`
  })
});

app.use('/api/auth', userRoutes);
app.use('/api/posts', postsRoutes);

db.sequelize.sync({force: false}).then(() => {
});

module.exports = app;