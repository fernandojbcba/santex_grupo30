const {
  addTeacherCourse,
  getCoursesForTeacher,
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

module.exports = {
  addTeacherCourseController,
  getTeacherEnrolledCourses,
};