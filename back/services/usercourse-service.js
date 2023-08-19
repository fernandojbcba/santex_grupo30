const { UserCourse } = require('../models');

async function addUserCourse(userId, courseId) {
  try {
    const newUserCourse = await UserCourse.create({
      UserId: userId,
      CourseId: courseId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return newUserCourse;
  } catch (error) {
    throw new Error('Error al agregar el usuario y el curso');
  }
}

module.exports = {
  addUserCourse,
};
