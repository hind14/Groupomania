module.exports = (sequelize, Sequelize) => {
    const Posts = sequelize.define("posts", {
      title: {
        type: Sequelize.STRING,
        required: true
      },
      content: {
        type: Sequelize.TEXT,
        required: true
      },
    });
  
    return Posts;
  };