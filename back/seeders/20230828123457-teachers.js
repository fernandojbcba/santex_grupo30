'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        firstName: "Albert",
        lastName: "Einstein",
        userName: "teachereinstein",
        password: "einstein",
        email: "einstein@example.com",
        RoleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Isaac",
        lastName: "Newton",
        userName: "teachernewton",
        password: "newton",
        email: "newton@example.com",
        RoleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Stephen",
        lastName: "Hawking",
        userName: "teacherhawking",
        password: "hawking",
        email: "hawking@example.com",
        RoleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Carl",
        lastName: "Sagan",
        userName: "teachersagan",
        password: "sagan",
        email: "sagan@example.com",
        RoleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Richard",
        lastName: "Feynman",
        userName: "teacherfeynman",
        password: "feynman",
        email: "feynman@example.com",
        RoleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Alan",
        lastName: "Turing",
        userName: "teacherturing",
        password: "turing",
        email: "turing@example.com",
        RoleId: 3,
        createdAt:new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Marie",
        lastName: "Curie",
        userName: "teachercurie",
        password: "curie",
        email: "curie@example.com",
        RoleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Galileo",
        lastName: "Galilei",
        userName: "teachergalilei",
        password: "galilei",
        email: "galilei@example.com",
        RoleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Leonhard",
        lastName: "Euler",
        userName: "teacheruler",
        password: "euler",
        email: "euler@example.com",
        RoleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Max",
        lastName: "Planck",
        userName: "teacherplanck",
        password: "planck",
        email: "planck@example.com",
        RoleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
      ;

    await queryInterface.bulkInsert('Users', users);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { RoleId: 2 });
  },
};
