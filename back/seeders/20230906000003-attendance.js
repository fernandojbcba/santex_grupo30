'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('attendance', [
      {
        UserId: 2, // ID de usuario
        CourseId: 1, // ID de curso
        StatusId: 1, // ID de estado
        date: new Date().toISOString().slice(0, 10),//sin hora
        isDeleted: false, // No eliminado
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 3,
        CourseId: 2,
        StatusId: 1,
        date: new Date().toISOString().slice(0, 10),
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 4,
        CourseId: 2,
        StatusId: 1,
        date: new Date().toISOString().slice(0, 10),
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 5,
        CourseId: 2,
        StatusId: 2,
        date: new Date().toISOString().slice(0, 10),
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Agregr más registros si quieren
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('attendance', null, {});
  },
};