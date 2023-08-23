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

  async createCourse(courseData) {
    const newCourse = await Course.create(courseData);
    return newCourse;
  }

  async updateCourse(courseId, updatedData) {
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    await course.update(updatedData);
    return course;
  }

  async deleteCourse(courseId) {
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    await course.destroy();
  }
}

module.exports = CourseService;
