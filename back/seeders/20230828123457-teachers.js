'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      { firstName: 'Teacher1', lastName: 'LastName1', userName: 'teacher1', password: 'password1', email: 'teacher1@example.com', RoleId: 2, createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Teacher2', lastName: 'LastName2', userName: 'teacher2', password: 'password2', email: 'teacher2@example.com', RoleId: 2, createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert('Users', users);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { RoleId: 2 });
  },
};
