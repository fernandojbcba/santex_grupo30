'use strict';

const currentDate = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CourseState', [
      {
        name: 'No Iniciado',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        name: 'En Curso',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        name: 'Finalizado',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CourseState', null, {});
  },
};
