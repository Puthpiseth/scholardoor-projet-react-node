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
      this.belongsTo(models.users)
    }
  };
  articles.init({
    user_id: DataTypes.INTEGER,
    file_path: DataTypes.STRING,
    title: DataTypes.STRING,
    authors: DataTypes.STRING,
    publiationDate: DataTypes.DATE,
    journal: DataTypes.STRING,
    issue: DataTypes.STRING,
    publisher: DataTypes.STRING,
    abstract: DataTypes.STRING,
    view_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'articles',
  });
  return articles;
};