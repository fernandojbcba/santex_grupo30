'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [adminRole, userRole] = await queryInterface.sequelize.query(
      'SELECT id FROM Roles WHERE roleName IN ('admin', 'user');'
    );

    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Administrador',
        lastName: 'admin',
        userName: 'admin',
        password: 'Password1*',
        email: 'admin@admin.com',
        RoleId: adminRole[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Tony',
        lastName: 'Stark',
        userName: 'ironman',
        password: 'Password1*',
        email: 'tony@avengers.com',
        RoleId: adminRole[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Steve',
        lastName: 'Rogers',
        userName: 'captainamerica',
        password: 'Password1*',
        email: 'steve@avengers.com',
        RoleId: adminRole[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Bruce',
        lastName: 'Banner',
        userName: 'hulk',
        password: 'Password1*',
        email: 'bruce@avengers.com',
        RoleId: adminRole[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Thor',
        lastName: '',
        userName: 'godofthunder',
        password: 'Password1*',
        email: 'thor@avengers.com',
        RoleId: adminRole[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Natasha',
        lastName: 'Romanoff',
        userName: 'blackwidow',
        password: 'Password1*',
        email: 'natasha@avengers.com',
        RoleId: adminRole[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Clint',
        lastName: 'Barton',
        userName: 'hawkeye',
        password: 'Password1*',
        email: 'clint@avengers.com',
        RoleId: adminRole[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'TChalla',
        lastName: '',
        userName: 'blackpanther',
        password: 'Password1*',
        email: 'tchalla@avengers.com',
        RoleId: adminRole[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Stephen',
        lastName: 'Strange',
        userName: 'doctorstrange',
        password: 'Password1*',
        email: 'stephen@avengers.com',
        RoleId: adminRole[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Wanda',
        lastName: 'Maximoff',
        userName: 'scarletwitch',
        password: 'Password1*',
        email: 'wanda@avengers.com',
        RoleId: adminRole[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Peter',
        lastName: 'Parker',
        userName: 'spiderman',
        password: 'Password1*',
        email: 'peter@avengers.com',
        RoleId: adminRole[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
