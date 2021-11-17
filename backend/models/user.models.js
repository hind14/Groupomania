module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name:  {
      type: Sequelize.STRING,
      required: true
    },
    lastname:  {
      type: Sequelize.STRING,
      required: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      required: true
    },
    password: {
      type: Sequelize.STRING,
      required: true
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });
  
  return User;
};