const CourseService = require('../services/course-service');

const courseService = new CourseService();

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
    res
      .status(500)
      .json({ error: 'An error occurred while fetching courses.' });
  }
}
async function createCourse(req, res) {
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
async function courseById(req, res) {
  const { courseId } = req.params;
  try {
    const course = await courseService.getCourseById(courseId);
    res.json(course);
  } catch (error) {
    // console.error('Error in CourseById:', error.message);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the course.' });
  }
}

async function endCourse(req, res) {
  const { courseId } = req.params;

  try {
    const updatedCourse = await courseService.updateCourseEnd(
      courseId,
      req.body.endCourse,
    );
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function startCourse(req, res) {
  const { courseId } = req.params;

  try {
    const updatedCourse = await courseService.updateCourseStart(
      courseId,
      req.body.startCourse,
    );
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCourseStatuses(req, res) {
  try {
    const statusNames = await courseService.getAllStatusNames();
    res.json(statusNames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllCourses,
  getEnrolledCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  courseById,
  endCourse,
  startCourse,
  getCourseStatuses,
};
