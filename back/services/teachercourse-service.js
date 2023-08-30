const { UserTeacherCourse, Course } = require('../models');

async function addCourse(userId, teacherCourseId) {
  try {
    const newUserTeacherCourse = await UserTeacherCourse.create({
      UserId: userId,
      TeacherCourseId: teacherCourseId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return newUserTeacherCourse;
  } catch (error) {
    throw new Error('Error al agregar el teacher y el curso');
  }
}

async function getCoursesForTeacher(teacherId) {
  try {
    const teacherCourses = await UserTeacherCourse.findAll({
      where: { UserId: teacherId }, //
      include: [
        {
          model: Course,
          as: 'Course',
          where: { isDeleted: false },
        },
      ],
    });
    const courses = teacherCourses.map((course) => course.Course);
    return courses;
  } catch (error) {
    throw new Error('Error fetching courses for teacher');
  }
}

async function addTeacherCourse(userId, teacherCourseId) {
  const existingEnrollment = await UserTeacherCourse.findOne({
    where: { UserId: userId, TeacherCourseId: teacherCourseId },
  });

  if (existingEnrollment) {
    throw new Error('El teacher ya está inscripto en este curso');
  } else {
    return addCourse(userId, teacherCourseId);
  }
}

module.exports = {
  addTeacherCourse, getCoursesForTeacher,
};
