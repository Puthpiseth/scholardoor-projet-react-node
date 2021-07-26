'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.posts, {
        onDelete: 'cascade'
      });
      this.hasMany(models.messages, {
        onDelete: 'cascade'
      });
      this.hasMany(models.comments, {
        onDelete: 'cascade'
      });
      this.hasOne(models.profiles, {
        onDelete: 'cascade'
      });
      this.hasMany(models.articles, {
        onDelete: 'cascade'
      });
      this.hasMany(models.chats, {
        onDelete: 'cascade'
      });
      

    }
  };
  users.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    verificationCode: DataTypes.STRING,
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpires: DataTypes.DATE,
    avatar: DataTypes.STRING,
    following: DataTypes.INTEGER,
    followers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};