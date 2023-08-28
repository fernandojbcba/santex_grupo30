'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserTeacherCourse', [
      { UserId: 1, CourseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { UserId: 2, CourseId: 1, createdAt: new Date(), updatedAt: new Date() },
      // Agrega más registros según necesites
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserTeacherCourse', null, {});
  },
};
