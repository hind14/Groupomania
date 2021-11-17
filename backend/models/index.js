//Configuration de la base de donnée grâce à Sequelize

const config = require("../config/db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

//Variable qui stocke un objet vide pour la base de donnée
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Récupération des modèles de base de données 
//pour les utilisateurs, les articles et les commentaires
db.user = require("../models/user.models.js")(sequelize, Sequelize);
db.posts = require("../models/posts.model.js")(sequelize, Sequelize);
db.comments = require("../models/comments.model.js")(sequelize, Sequelize);

//Un article appartient à un utilisateur, relié par l'id de l'utilisateur
db.posts.belongsTo(db.user, {
  foreignKey: "userId",
  onDelete: 'CASCADE',
  as: "user",
});

//Un commentaire appartient à un utilisateur, relié par l'id de l'utilisateur
db.comments.belongsTo(db.user, {
  foreignKey: "userId",
  onDelete: 'CASCADE',
  as: "user"
});

////Un commentaire possède l'id d'un article
db.comments.belongsTo(db.posts, {
  foreignKey: "postId",
  onDelete: 'CASCADE',
  as: "posts"
});

//Un utilisateur peut avoir plusieurs articles
db.user.hasMany(db.posts, { as: "posts"});

//Un utilisateur peut avoir plusieurs commentaires
db.user.hasMany(db.comments, {as : "comments"});

//Un articles peut avoir plusieurs commentaires
db.posts.hasMany(db.comments, {as : "comments"});

module.exports = db;
