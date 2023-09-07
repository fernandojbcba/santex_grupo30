'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Attendance', {
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
        type: Sequelize.DATE,
        allowNull: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Attendance');
  },
};
