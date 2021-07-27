'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  articles.init({
    userId: DataTypes.INTEGER,
    filePath: DataTypes.STRING,
    title: DataTypes.STRING,
    authors: DataTypes.STRING,
    publicationDate: DataTypes.DATE,
    journal: DataTypes.STRING,
    issue: DataTypes.STRING,
    publisher: DataTypes.STRING,
    abstract: DataTypes.STRING,
    viewId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'articles',
  });
  return articles;
};