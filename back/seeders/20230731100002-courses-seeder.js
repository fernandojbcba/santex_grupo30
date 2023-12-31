'use strict';
const currentDate = new Date();
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Courses', [
      {
        title: 'Curso de Soldadura Industrial',
        description:
          'Aprende las técnicas avanzadas de soldadura en este curso intensivo.',
        daysAndHours: 'Lunes a viernes 9:00 AM - 1:00 PM',
        duration: '2 meses',
        price: 1500,
        isPublished: true,
        createdAt: currentDate,
        updatedAt: currentDate,
        courseStateId: '1',
      },
      {
        title: 'Taller de Carpintería en Madera',
        description:
          'Aprende a trabajar la madera y crear muebles personalizados.',
        daysAndHours: 'Sábados 10:00 AM - 2:00 PM',
        duration: '3 meses',
        price: 1200,
        isPublished: true,
        createdAt: currentDate,
        updatedAt: currentDate,
        courseStateId: '1',
      },
      {
        title: 'Curso de Fontanería Residencial',
        description:
          'Aprende a reparar y mantener sistemas de fontanería en hogares.',
        daysAndHours: 'Martes y jueves 6:00 PM - 9:00 PM',
        duration: '2 meses',
        price: 1000,
        isPublished: true,
        createdAt: currentDate,
        updatedAt: currentDate,
        courseStateId: '1',
      },
      {
        title: 'Taller de Panadería y Pastelería',
        description:
          'Aprende a hornear pan y crear deliciosos postres en este taller práctico.',
        daysAndHours: 'Miércoles y viernes 3:00 PM - 6:00 PM',
        duration: '3 meses',
        price: 800,
        isPublished: true,
        createdAt: currentDate,
        updatedAt: currentDate,
        courseStateId: '1',
      },
      {
        title: 'Curso de Electricidad Doméstica',
        description:
          'Aprende a realizar instalaciones eléctricas en hogares de manera segura.',
        daysAndHours: 'Lunes y jueves 7:00 PM - 9:00 PM',
        duration: '2 meses',
        price: 1100,
        isPublished: true,
        createdAt: currentDate,
        updatedAt: currentDate,
        courseStateId: '1',
      },
      {
        title: 'Taller de Jardinería y Paisajismo',
        description:
          'Aprende a diseñar y mantener hermosos jardines y paisajes.',
        daysAndHours: 'Sábados 9:00 AM - 12:00 PM',
        duration: '3 meses',
        price: 900,
        isPublished: true,
        createdAt: currentDate,
        updatedAt: currentDate,
        courseStateId: '1',
      },
      {
        title: 'Curso de Reparación de Computadoras',
        description: 'Aprende a diagnosticar y reparar computadoras y laptops.',
        daysAndHours: 'Martes y jueves 6:00 PM - 8:00 PM',
        duration: '2 meses',
        price: 1300,
        isPublished: true,
        createdAt: currentDate,
        updatedAt: currentDate,
        courseStateId: '1',
      },
      {
        title: 'Taller de Costura y Confección',
        description:
          'Aprende a coser y confeccionar prendas de vestir a medida.',
        daysAndHours: 'Miércoles y viernes 4:00 PM - 7:00 PM',
        duration: '3 meses',
        price: 950,
        isPublished: true,
        createdAt: currentDate,
        updatedAt: currentDate,
        courseStateId: '1',
      },
      {
        title: 'Curso de Cocina Internacional',
        description:
          'Aprende a preparar platos de diferentes cocinas del mundo.',
        daysAndHours: 'Sábados 11:00 AM - 2:00 PM',
        duration: '3 meses',
        price: 1200,
        isPublished: true,
        createdAt: currentDate,
        updatedAt: currentDate,
        courseStateId: '1',
      },
      {
        title: 'Taller de Maquillaje Profesional',
        description:
          'Aprende técnicas de maquillaje para eventos especiales y pasarelas.',
        daysAndHours: 'Lunes a jueves 5:00 PM - 8:00 PM',
        duration: '2 meses',
        price: 1000,
        isPublished: true,
        createdAt: currentDate,
        updatedAt: currentDate,
        courseStateId: '1',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Courses', null, {});
  },
};
