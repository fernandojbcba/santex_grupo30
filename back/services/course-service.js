const { Course } = require('../models');
const { UserCourse } = require('../models');

async function getAllCourses() {
  const courses = await Course.findAll();
  return courses;
}

async function getCoursesForUser(userId) {
  const userCourse = await UserCourse.findAll({
    where: { UserId: userId },
    include: [{ model: Course, as: 'Course' }],
  });

  const courses = userCourse.map((course) => course.Course);

  return courses;
}

module.exports = { getAllCourses, getCoursesForUser };
