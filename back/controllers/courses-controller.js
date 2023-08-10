const courseService = require('../services/course-service');

async function getAllCourses(req, res, next) {
  try {
    const courses = await courseService.getAllCourses();

    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
}

async function getEnrolledCourses(req, res) {
  const { userId } = req.params;

  try {
    const courses = await courseService.getCoursesForUser(userId);
    res.json(courses);
  } catch (error) {
    // console.error('Error in getEnrolledCourses:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching courses.' });
  }
}

module.exports = { getAllCourses, getEnrolledCourses };
