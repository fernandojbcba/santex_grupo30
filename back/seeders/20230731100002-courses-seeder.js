'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Courses', [
      {
        title: 'Curso Semipermanente',
        description: 'Lunes 24 de Julio. Duracion 3 Clases. Horario: 15 hs. Costo inscripción: $ 1000 Curso: $3000. Incluye material',
        daysAndHours: 'Lunes 15:00 - 18:00',
        duration: '3 clases',
        price: 3000,
        imageUrl: 'URL de la imagen del curso',
        isPublished: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Talleres de invierno',
        description: 'Para niñosde 6 a 12 años. Viernes 14 "Galletas para decorar". Martes 18 "Trufas". Costo: $1000 c/u.',
        daysAndHours: 'Lunes 15:00 - 18:00',
        duration: '3 clases',
        price: 3000,
        imageUrl: 'URL de la imagen del curso',
        isPublished: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Sublimación con máquina',
        description: 'Sublimacipon de gorras, tazas, remeras, llaveros, entre otros. Costo: $5000. Consultar por cupos.',
        daysAndHours: 'Lunes 15:00 - 16:00',
        duration: '8 clases',
        price: 3000,
        imageUrl: 'URL de la imagen del curso',
        isPublished: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Taller de diseño y reciclaje: luminaria',
        description: 'Diseño y materialización de productos ecológicos. Fecha: 14 de junio". Costo: $3000',
        daysAndHours: 'Lunes 16:00 - 19:00',
        duration: '3 clases',
        price: 3000,
        imageUrl: 'URL de la imagen del curso',
        isPublished: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Courses', null, {});
  },
};
