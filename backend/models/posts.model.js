module.exports = (sequelize, Sequelize) => {
    const Posts = sequelize.define("posts", {
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING
      },
    });
  
    return Posts;
  };