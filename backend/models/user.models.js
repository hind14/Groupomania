module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name:  {
      type: Sequelize.STRING
    },
    lastname:  {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });
  
  return User;
};