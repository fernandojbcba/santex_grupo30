const { Course, UserCourse } = require('../models');

class CourseService {
  async getAllCourses() {
    const courses = await Course.findAll({
      where: {
        isDeleted: false,
        // isPublished: true,
      },
    });
    return courses;
  }

  async getCoursesForUser(userId) {
    const userCourse = await UserCourse.findAll({
      where: { UserId: userId },
      include: [
        {
          model: Course,
          // as: 'teachers',
          where: { isDeleted: false }, // Filtrar por registros no borrados
        },
      ],
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
    await course.update({ isDeleted: true });
    // await course.destroy();
  }

  async getCourseById(courseId) {
    try {
      const course = await Course.findOne({
        where: { id: courseId, isDeleted: false },
      });

      if (!course) {
        throw new Error('Course not found');
      }

      return course;
    } catch (error) {
      throw new Error('Error fetching course by ID');
    }
  }
}

module.exports = CourseService;
