const {
  addTeacherCourse,
  getCoursesForTeacher,
  editTeacherCourse,
  deleteTeacherCourseById,
} = require('../services/teachercourse-service');

async function addTeacherCourseController(req, res) {
  const { userId, teacherCourseId } = req.body;
  const { user } = req; // Obtengo usuario

  try {
    if (user.role === 'admin') {
      const newTeacherCourse = await addTeacherCourse(userId, teacherCourseId);
      res.status(201).json(newTeacherCourse);
    } else {
      res.status(403).json({ error: 'Acceso no autorizado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTeacherEnrolledCourses(req, res) {
  const { teacherId } = req.params;
  const { user } = req; // Obtengo el usuario autenticado

  try {
    if (
      user.role === 'admin' || (user.role === 'teacher' && user.id === parseInt(teacherId, 10))
    ) {
      const getCourses = await getCoursesForTeacher(teacherId);
      res.json(getCourses);
    } else {
      res.status(403).json({ error: 'Access denied' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching courses.' });
  }
}
async function editTeacherCourseController(req, res) {
  const { userId, teacherCourseId } = req.body;
  const { user } = req; // Obtengo usuario
  const { newData } = req.body; // Nuevos datos para la edición

  try {
    if (user.role === 'admin') {
      const editedTeacherCourse = await editTeacherCourse(userId, teacherCourseId, newData);
      res.status(200).json(editedTeacherCourse);
    } else {
      res.status(403).json({ error: 'Acceso no autorizado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTeacherCourseController(req, res) {
  const { id } = req.params;

  try {
    // Llama a la función del servicio para eliminar la asignación
    const deletedTeacherCourse = await deleteTeacherCourseById(id);

    if (!deletedTeacherCourse) {
      return res.status(404).json({ error: 'Asignación de curso no encontrada' });
    }

    return res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  return null;
}

module.exports = {
  addTeacherCourseController,
  getTeacherEnrolledCourses,
  editTeacherCourseController,
  deleteTeacherCourseController,
};
