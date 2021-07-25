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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.models.js")(sequelize, Sequelize);
db.posts = require("../models/posts.model.js")(sequelize, Sequelize);
db.comments = require("../models/comments.model.js")(sequelize, Sequelize);

db.posts.belongsToMany(db.user, {
  through: "user_posts",
  foreignKey: "postsId",
  otherKey: "userId"
});

db.user.belongsToMany(db.posts, {
  through: "user_posts",
  foreignKey: "userId",
  otherKey: "postsId"
});

db.comments.belongsToMany(db.user, {
  through: "user_comments",
  foreignKey: "userId",
  otherKey: "comments"
});

//Clés étrangères - relations :
// Article.userId, User.id,
// Commentaire.userId, User.id,
// Commentaire.articleId => Article.id

db.POSTS = ["user"];

module.exports = db;