'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Courses', [
      {
        title: 'Curso Semipermanente',
        description: 'Lunes 24 de Julio. Duracion 3 Clases. Horario: 15 hs. Costo inscripción: $ 1000 Curso: $3000. Incluye material',
        daysAndHours: 'Lunes y Miércoles, 15:00 - 17:00',
        duration: '3 semanas',
        price: 3000,
        imageUrl: 'ruta-de-la-imagen.png',
        isPublished: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Talleres de invierno',
        description: 'Para niños de 6 a 12 años. Viernes 14 "Galletas para decorar". Martes 18 "Trufas". Costo: $1000 c/u.',
        daysAndHours: 'Viernes, 14:00 - 16:00 / Martes, 18:00 - 20:00',
        duration: '1 semana por taller',
        price: 1000,
        imageUrl: 'ruta-de-la-imagen.png',
        isPublished: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Sublimación con máquina',
        description: 'Sublimación de gorras, tazas, remeras, llaveros, entre otros. Costo: $5000. Consultar por cupos.',
        daysAndHours: 'Consultar por horarios disponibles',
        duration: '4 semanas',
        price: 5000,
        imageUrl: 'ruta-de-la-imagen.png',
        isPublished: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Taller de diseño y reciclaje: luminaria',
        description: 'Diseño y materialización de productos ecológicos. Fecha: 14 de junio. Costo: $3000',
        daysAndHours: '14 de junio, 10:00 - 13:00',
        duration: '1 día',
        price: 3000,
        imageUrl: 'ruta-de-la-imagen.png',
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

