const { Course, UserCourse, CourseState } = require('../models');

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
          where: { isDeleted: false },
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

  async updateCourseStart(courseId, startCourse) {
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    await course.update({
      startCourse,
      courseStateId: 2,
    });

    return course;
  }

  async updateCourseEnd(courseId, endCourse) {
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    await course.update({
      endCourse,
      courseStateId: 3,
    });

    return course;
  }

  async getAllStatusNames() {
    try {
      const courseStatuses = await CourseState.findAll();
      const statusNames = courseStatuses.map((status) => ({
        id: status.id,
        name: status.name,
      }));
      return statusNames;
    } catch (error) {
      console.log(error);
      throw new Error('Unable to fetch course status names.');
    }
  }
}

module.exports = CourseService;
