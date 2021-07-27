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

//Clés étrangères - relations :
// Article.userId, User.id,
// Commentaire.userId, User.id,
// Commentaire.articleId => Article.id

db.posts.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

db.comments.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user"
});

db.user.hasMany(db.posts, { as: "posts"});
db.user.hasMany(db.comments, {as : "comments"});

db.comments.belongsToMany(db.posts, {
  through: "posts_comments",
  foreignKey: "commentsId",
  otherKey: "postsId"
});

module.exports = db;
