'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Status', [
      {
        name: 'Present',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Absent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tardy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Puedes agregar más registros de status según tus necesidades
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Status', null, {});
  },
};