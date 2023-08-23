const { Course, UserCourse } = require('../models');

class CourseService {
  async getAllCourses() {
    const courses = await Course.findAll();
    return courses;
  }

  async getCoursesForUser(userId) {
    const userCourse = await UserCourse.findAll({
      where: { UserId: userId },
      include: [{ model: Course, as: 'Course' }],
    });

    const courses = userCourse.map((course) => course.Course);

    return courses;
  }
}

module.exports = CourseService;
