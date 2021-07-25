module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
      content: {
        type: Sequelize.STRING
      }
    });
    return Comments;
  };