'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      sender_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      inboxHash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastMessage: {
        allowNull: false,
        type: Sequelize.STRING
      },
      seen: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deleted: {
        allowNull: false,
        type: Sequelize.STRING
      },
      unseenNumbers: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('messages');
  }
};