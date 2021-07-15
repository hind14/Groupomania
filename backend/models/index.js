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

//We use User.belongsToMany(posts) to indicate that the user model can belong to many Roles and vice versa
//New table  user_roles that makes the connection between users and posts

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

db.POSTS = ["user"];

module.exports = db;