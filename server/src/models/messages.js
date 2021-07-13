'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users)
    }
  };
  messages.init({
    userId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    inboxHash: DataTypes.STRING,
    lastMessage: DataTypes.STRING,
    seen: DataTypes.STRING,
    deleted: DataTypes.STRING,
    unseenNumbers: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'messages',
  });
  return messages;
};