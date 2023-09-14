'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserTeacherCourse', [
      {
        UserId: 14,
        TeacherCourseId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 15,
        TeacherCourseId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 16,
        TeacherCourseId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 17,
        TeacherCourseId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 18,
        TeacherCourseId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 19,
        TeacherCourseId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 20,
        TeacherCourseId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 21,
        TeacherCourseId: 10,
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
