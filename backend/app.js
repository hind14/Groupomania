require('dotenv').config();

const express = require('express');
const cors = require('cors');

//const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());
app.use(cors());

const db = require("./models");
const Role = db.role;

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

db.sequelize.sync({force: false}).then(() => {
  initial();
});

//initial() function helps us to create 3 rows in database.

function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
 
//   Role.create({
//     id: 2,
//     name: "moderator"
//   });
 
//   Role.create({
//     id: 3,
//     name: "admin"
//   });
 };

module.exports = app;