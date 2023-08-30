'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserTeacherCourse', [
      {
        UserId: 7,
        TeacherCourseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 8,
        TeacherCourseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Agrega más registros según necesites
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserTeacherCourse', null, {});
  },
};
