'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attendance', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
          },
        allowNull: false,
      },
      CourseId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Courses',
            key: 'id'
          },
        allowNull: false,
      },
      StatusId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Status',
            key: 'id'
          },
        allowNull: false,
      },
      date: {
        //type: Sequelize.DATE,
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('attendance');
  },
};
