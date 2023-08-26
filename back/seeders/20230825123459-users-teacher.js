"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10; // Número de rounds de encriptación

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const teacherRole = await queryInterface.sequelize.query(
      "SELECT id FROM Roles WHERE roleName = :roleName",
      {
        replacements: { roleName: "teacher" },
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    if (!teacherRole[0]) {
      throw new Error('Role "teacher" not found');
    }

    const hashedPassword = bcrypt.hashSync("password123", saltRounds);

    await queryInterface.bulkInsert("Users", [
      {
        firstName: "Teacher",
        lastName: "TeacherLastName",
        userName: "teacher",
        password: hashedPassword,
        email: "teacher@example.com",
        RoleId: teacherRole[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
