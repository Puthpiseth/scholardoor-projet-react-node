
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Follows, {
        onDelete: 'cascade',
        foreignKey: 'userId'

      })
      this.hasMany(models.Articles, {
        onDelete: 'cascade',
        foreignKey: 'userId'
      });
      this.hasMany(models.Posts, {
        onDelete: 'cascade',
        foreignKey: 'userId'

      });
      this.hasMany(models.Comments, {
        onDelete: 'cascade',
        foreignKey: 'userId'
      });
    }
  };
  Users.init({
    id: {
      type:DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    termsAccepted: DataTypes.BOOLEAN,
    resetPasswordToken: DataTypes.STRING,
    avatar: DataTypes.TEXT('long'),
    position: DataTypes.STRING,
    affiliation: DataTypes.STRING,
    researchInterest: DataTypes.STRING,
    location: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};