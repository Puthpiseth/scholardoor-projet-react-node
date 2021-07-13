'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users)
    }
  };
  profiles.init({
    userId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    position: DataTypes.STRING,
    affilation: DataTypes.STRING,
    content: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'profiles',
  });
  return profiles;
};