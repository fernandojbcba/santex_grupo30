const CourseService = require('../services/course-service');

async function getAllCourses(req, res, next) {
  const courseService = new CourseService();
  try {
    const courses = await courseService.getAllCourses();

    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
}

async function getEnrolledCourses(req, res) {
  const courseService = new CourseService();
  const { userId } = req.params;

  try {
    const courses = await courseService.getCoursesForUser(userId);
    res.json(courses);
  } catch (error) {
    // console.error('Error in getEnrolledCourses:', error.message);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching courses.' });
  }
}
async function createCourse(req, res) {
  const courseService = new CourseService();
  const courseData = req.body;

  try {
    const newCourse = await courseService.createCourse(courseData);
    res.status(201).json(newCourse);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while creating the course.' });
  }
}

async function updateCourse(req, res) {
  const courseService = new CourseService();
  const { courseId } = req.params;
  const updatedData = req.body;

  try {
    const updatedCourse = await courseService.updateCourse(
      courseId,
      updatedData,
    );
    res.status(200).json(updatedCourse);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while updating the course.' });
  }
}

async function deleteCourse(req, res) {
  const courseService = new CourseService();
  const { courseId } = req.params;

  try {
    await courseService.deleteCourse(courseId);
    res.status(204).send();
  } catch (error) {
    // console.error('Error deleting course:', error); // Registrar el error completo
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the course.' });
  }
}

module.exports = {
  getAllCourses,
  getEnrolledCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};
