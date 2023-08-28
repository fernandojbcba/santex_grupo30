'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      daysAndHours: {
        type: Sequelize.STRING, // Agrega el campo de días y horarios
        allowNull: true
      },
      duration: {
        type: Sequelize.STRING, // Agrega el campo de duración
        allowNull: true
      },
      price: {
        type: Sequelize.INTEGER, // Agrega el campo de precio
        allowNull: true
      },
      imageUrl: {
        type: Sequelize.STRING, // Agrega el campo de URL de imagen
        allowNull: true
      },
      isPublished: {
        type: Sequelize.BOOLEAN, // Agrega el campo de publicación
        defaultValue: false
      },
      isDeleted: {
        type: Sequelize.BOOLEAN, // Agrega el campo de eliminación
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};