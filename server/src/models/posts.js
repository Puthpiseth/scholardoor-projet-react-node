'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {foreignKey: 'userId'});
      this.belongsTo(models.Comments, {foreignKey: 'commentId'});
    }
  };
 Posts.init({
  id: {
    type:DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
    postArticle: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    likes: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};