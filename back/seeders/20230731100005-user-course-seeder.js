'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserCourse', [
      {
        UserId: 2,
        CourseId: 1,
        ApprovalStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 2,
        CourseId: 2,
        ApprovalStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 3,
        CourseId: 1,
        ApprovalStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 2,
        CourseId: 5,
        ApprovalStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 8,
        CourseId: 2,
        ApprovalStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 4,
        CourseId: 7,
        ApprovalStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 10,
        CourseId: 10,
        ApprovalStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 6,
        CourseId: 1,
        ApprovalStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 3,
        CourseId: 6,
        ApprovalStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 7,
        CourseId: 8,
        ApprovalStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 5,
        CourseId: 3,
        ApprovalStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 9,
        CourseId: 4,
        ApprovalStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 11,
        CourseId: 9,
        ApprovalStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
    ]);
  },

  down: async (queryInterfacse, Sequelize) => {
    await queryInterface.bulkDelete('UserCourse', null, {});
  },
};
