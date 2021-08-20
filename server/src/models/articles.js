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
        {foreignKey: 'userId'});
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
    publicationDate: DataTypes.DATE,
    journal: DataTypes.STRING,
    issue: DataTypes.STRING,
    publisher: DataTypes.STRING,
    abstract: DataTypes.STRING,
    viewId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Articles',
  });
  return Articles;
};