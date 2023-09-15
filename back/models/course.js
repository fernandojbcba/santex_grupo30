const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {
    static associate(models) {
      // Defino mis asociaciones
      Course.belongsToMany(models.User, {
        through: 'UserCourse',
        foreignKey: 'CourseId',
        as: 'users',
      });// user inscriptos en cursos

      Course.belongsToMany(models.User, {
        through: 'UserTeacherCourse',
        foreignKey: 'TeacherCourseId',
        otherKey: 'UserId',
        as: 'teachers',
      });// Alias para relacion teacher que enseña el curso

      Course.hasMany(models.Attendance, {
        foreignKey: 'CourseId',
        as: 'attendance', // Alias para la relación de asistencia del curso
      });
    }
  }

  Course.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      daysAndHours: {
        type: DataTypes.STRING, // Por ejemplo: "Lunes y Miércoles, 18:00 - 20:00"
      },
      duration: {
        type: DataTypes.STRING, // Por ejemplo: "2 semanas"
      },
      price: {
        type: DataTypes.INTEGER, // Sin decimales
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      vacancies: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Course',
    },
  );

  return Course;
};
