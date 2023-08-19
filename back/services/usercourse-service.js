const { UserCourse } = require('../models');

async function addCourse(userId, courseId) {
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
async function addUserCourse(userId, courseId) {
  const existingEnrollment = await UserCourse.findOne({
    where: { UserId: userId, CourseId: courseId },
  });

  if (existingEnrollment) {
    throw new Error('El usuario ya está inscrito en este curso');
  } else {
    return addCourse(userId, courseId);
  }
}

module.exports = {
  addUserCourse,
};
