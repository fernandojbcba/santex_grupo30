const { addUserCourse } = require('../services/usercourse-service');

async function addUserCourseController(req, res) {
  const { userId, courseId } = req.body;
  try {
    const newUserCourse = await addUserCourse(userId, courseId);
    res.status(201).json(newUserCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addUserCourseController,
};
