'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Attendance', [
      {
        UserId: 2, // ID de usuario
        CourseId: 1, // ID de curso
        StatusId: 1, // ID de estado
        date: new Date(), // Fecha de asistencia
        isDeleted: false, // No eliminado
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 3,
        CourseId: 2,
        StatusId: 1,
        date: new Date(),
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 4,
        CourseId: 2,
        StatusId: 1,
        date: new Date(),
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 5,
        CourseId: 2,
        StatusId: 2,
        date: new Date(),
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Agregr más registros si quieren
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Attendance', null, {});
  },
};