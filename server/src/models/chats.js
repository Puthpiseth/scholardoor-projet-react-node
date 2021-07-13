'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users);
    }
  };
  chats.init({
    sender_id: DataTypes.INTEGER,
    inboxHash: DataTypes.STRING,
    message: DataTypes.TEXT,
    file: DataTypes.TEXT,
    meta: DataTypes.TEXT,
    deleted_user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'chats',
  });
  return chats;
};