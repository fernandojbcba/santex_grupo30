'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('approvalStatus', [
      {
        name: 'Inscripto',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'En Curso',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Aprobado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Desaprobado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('approvalStatus', null, {});
  },
};