const {
  UserTeacherCourse, Course, User, UserCourse,
} = require('../models');

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

async function getUsersInCourseForTeacher(teacherId, courseId) {
  try {
    const usersInCourse = await UserCourse.findAll({
      where: { CourseId: courseId },
      include: [
        {
          model: User,
          as: 'User',
        },
      ],
    });

    return usersInCourse.map((userCourse) => userCourse.User);
  } catch (error) {
    throw new Error('Error fetching users in course for teacher');
  }
}
async function editTeacherCourse(userId, teacherCourseId, newData) {
  try {
    // Buscar la relación existente por ID
    const userTeacherCourse = await UserTeacherCourse.findByPk(teacherCourseId);
    if (!userTeacherCourse) {
      throw new Error('No se encontró la asignación del teacher en el curso');
    }

    // Verificar si ya existe una relación con la misma combinación UserId y TeacherCourseId
    const existingEnrollment = await UserTeacherCourse.findOne({
      where: { UserId: userId, TeacherCourseId: teacherCourseId },
    });

    if (existingEnrollment && existingEnrollment.id !== userTeacherCourse.id) {
      throw new Error('El teacher ya está inscripto en este curso');
    }

    // Realiza las actualizaciones según los nuevos datos (newData)
    // Por ejemplo, podrías actualizar campos específicos aquí
    userTeacherCourse.someField = newData.someField; // Actualiza los campos necesarios
    await userTeacherCourse.save();
    return userTeacherCourse;
  } catch (error) {
    throw new Error('Error al editar la asignación de curso');
  }
}
async function deleteTeacherCourseById(id) {
  try {
    // Busco asignación en modelo
    const userTeacherCourse = await UserTeacherCourse.findByPk(id);

    if (!userTeacherCourse) {
      return null; // si no lo encuentro, no hay error.
    }

    // Verifico si ya está marcada como eliminada
    if (userTeacherCourse.isDeleted) {
      throw new Error('La asignación de curso ya ha sido eliminada');
    }

    // Marcar como eliminada actualizando el campo isDeleted
    userTeacherCourse.isDeleted = true;
    await userTeacherCourse.save();

    return userTeacherCourse;
  } catch (error) {
    console.error('Error al eliminar la asignación de curso:', error);
    throw error;
  }
}

module.exports = {
  addTeacherCourse,
  getCoursesForTeacher,
  getUsersInCourseForTeacher,
  editTeacherCourse,
  deleteTeacherCourseById,
};
