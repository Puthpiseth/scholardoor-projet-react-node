'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      filePath: {
        allowNull: false,
        type: Sequelize.STRING
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      authors: {
        allowNull: false,
        type: Sequelize.STRING
      },
      publicationDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      journal: {
        allowNull: false,
        type: Sequelize.STRING
      },
      issue: {
        allowNull: false,
        type: Sequelize.STRING
      },
      publisher: {
        allowNull: false,
        type: Sequelize.STRING
      },
      abstract: {
        allowNull: false,
        type: Sequelize.STRING
      },
      viewId: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Articles');
  }
};