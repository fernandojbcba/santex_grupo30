const {
  addTeacherCourse,
  getCoursesForTeacher,
  getUsersInCourseForTeacher,
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

async function getUsersInCourse(req, res) {
  const { user } = req; // Obtener profesor autenticado desde el middleware
  const { courseId } = req.params;

  try {
    // Llama a la función para obtener usuarios inscritos en el curso
    const usersInCourse = await getUsersInCourseForTeacher(user.id, courseId);
    console.log(`user${user.id}course${courseId}`);
    res.json(usersInCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addTeacherCourseController,
  getTeacherEnrolledCourses,
  getUsersInCourse,
};
