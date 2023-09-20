const { addUserCourse } = require('../services/usercourse-service');

async function addUserCourseController(req, res) {
  const { userId, courseId, approvalStatusId } = req.body;
  const { user } = req; // Obtengo usuario autenticado desde authenticateToken

  try {
    if (user.role === 'admin' || user.id === userId) {
      // Si el usuario es administrador o el propietario del curso
      const newUserCourse = await addUserCourse(userId, courseId, approvalStatusId);
      res.status(201).json(newUserCourse);
    } else {
      res.status(403).json({ error: 'Acceso no autorizado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  addUserCourseController,
};
