'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {foreignKey: 'userId'});
    }
  };
  Follows.init({
    id: {
      type:DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    following: DataTypes.UUID,
    followers: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Follows',
  });
  return Follows;
};