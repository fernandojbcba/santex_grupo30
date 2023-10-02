const { Op } = require('sequelize');
const {
  UserTeacherCourse, Course, User, UserCourse, Attendance,
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
      where: { UserId: teacherId, isDeleted: false },
      include: [
        {
          model: Course,
          as: 'Course',
          where: { isDeleted: false },
        },
      ],
    });

    // Mapear los resultados para incluir el ID de la relación
    const courses = teacherCourses.map((course) => ({
      course: course.Course, // Detalles del curso
      userTeacherCourseId: course.id, //  id para borrar relaciòn profesor y curso
    }));

    return courses;
  } catch (error) {
    throw new Error('Error fetching courses for teacher');
  }
}

async function addTeacherCourse(userId, teacherCourseId) {
  try {
    // busco asignación existente, incluyo las marcadas como eliminadas
    const existingEnrollment = await UserTeacherCourse.findOne({
      where: { UserId: userId, TeacherCourseId: teacherCourseId },
    });

    if (existingEnrollment) {
      // Si asignación existente,  marcada como eliminada, cambio su estado a false
      if (existingEnrollment.isDeleted) {
        existingEnrollment.isDeleted = false;
        await existingEnrollment.save();
        return existingEnrollment; // Retorno asignación actualizada
      }
      throw new Error('El teacher ya está inscripto en este curso');
    } else {
      // Si no se encontró, creo una nueva
      return addCourse(userId, teacherCourseId);
    }
  } catch (error) {
    throw new Error('Error al asignar al teacher al curso');
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

// async function getUsersInCourseForTeacher(teacherId, courseId) {
//   try {
//     const userCourses = await UserCourse.findAll({
//       where: { CourseId: courseId },
//       include: [
//         {
//           model: User,
//           as: 'User',
//           attributes: ['id', 'firstName', 'lastName', 'userName', 'email'],
//         },
//       ],
//     });

//     return userCourses.map((userCourse) => ({
//       user: userCourse.User,
//       approvalStatusId: userCourse.approvalStatusId,

//     }));
//   } catch (error) {
//     throw new Error('Error fetching users in course for teacher');
//   }
// }
async function getUsersInCourseForTeacher(teacherId, courseId) {
  try {
    const currentDate = new Date(); // Obtén la fecha actual
    const userCourses = await UserCourse.findAll({
      where: { CourseId: courseId },
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'firstName', 'lastName', 'userName', 'email'],
        },
      ],
    });

    // Obtén la fecha de inicio del curso
    const course = await Course.findOne({ where: { id: courseId } });
    const courseStartDate = course.startCourse;

    // Filtra las asistencias hasta la fecha actual
    const attendancePromises = userCourses.map(async (userCourse) => {
      const presentCount = await Attendance.count({
        where: {
          UserId: userCourse.UserId,
          CourseId: courseId,
          StatusId: 1, // ID de presente
          date: {
            [Op.gte]: courseStartDate, // Asistencias después de la fecha de inicio del curso
            [Op.lte]: currentDate, // Asistencias hasta la fecha actual
          },
        },
      });

      const absentCount = await Attendance.count({
        where: {
          UserId: userCourse.UserId,
          CourseId: courseId,
          StatusId: 2, // ID de ausente
          date: {
            [Op.gte]: courseStartDate, // Asistencias después de la fecha de inicio del curso
            [Op.lte]: currentDate, // Asistencias hasta la fecha actual
          },
        },
      });

      return {
        user: userCourse.User,
        presentCount,
        absentCount,
        approvalStatusId: userCourse.approvalStatusId,
      };
    });

    const usersWithAttendances = await Promise.all(attendancePromises);
    return usersWithAttendances;
  } catch (error) {
    throw new Error('Error fetching users and attendances for the course');
  }
}
async function getTeacherbyCourse(teacherCourseId) {
  try {
    const userTeacherCourse = await UserTeacherCourse.findOne({
      where: {
        TeacherCourseId: teacherCourseId,
        isDeleted: false,
      },
      include: {
        model: User,
        attributes: ['id', 'userName'], // Cambia 'id' por 'userName'
      },
    });
    if (userTeacherCourse && userTeacherCourse.User) {
      return {
        id: userTeacherCourse.id,
        UserId: userTeacherCourse.UserId,
        TeacherCourseId: userTeacherCourse.TeacherCourseId,
        User: {
          id: userTeacherCourse.User.id,
          UserName: userTeacherCourse.User.userName,
        },
      };
    }
    return null; // TeacherCourseId no encontrado
  } catch (error) {
    console.error('Error al obtener el UserId:', error);
    throw error;
  }
}
module.exports = {
  addTeacherCourse,
  getCoursesForTeacher,
  getUsersInCourseForTeacher,
  editTeacherCourse,
  deleteTeacherCourseById,
  getTeacherbyCourse,
};
