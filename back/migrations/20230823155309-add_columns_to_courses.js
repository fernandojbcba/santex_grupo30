'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Courses', 'daysAndHours', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Courses', 'duration', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Courses', 'price', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('Courses', 'imageUrl', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Courses', 'isPublished', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn('Courses', 'isDeleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};