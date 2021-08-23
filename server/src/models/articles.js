'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, 
        {foreignKey: 'userId', as: 'articleAuthor'});
    }
  };
  Articles.init({
    id: {
      type:DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    filePath: DataTypes.TEXT('long'),
    title: DataTypes.STRING,
    authors: DataTypes.STRING,
    publicationDate: DataTypes.STRING,
    journal: DataTypes.STRING,
    issue: DataTypes.STRING,
    publisher: DataTypes.STRING,
    abstract: DataTypes.TEXT('medium'),
    viewId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Articles',
  });
  return Articles;
};