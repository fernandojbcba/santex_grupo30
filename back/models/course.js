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
      Course.belongsTo(models.CourseState, {
        foreignKey: 'courseStateId', // Agrega una columna courseStateId a la tabla Course
        as: 'courseState', // Alias para la relación
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
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      courseStateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      startCourse: {
        type: DataTypes.DATEONLY,
        allowNull: true, // Puede ser nulo si el curso aún no ha comenzado
      },

      endCourse: {
        type: DataTypes.DATEONLY,
        allowNull: true, // Puede ser nulo si el curso aún no ha finalizado
      },
    },
    {
      sequelize,
      modelName: 'Course',
    },
  );

  return Course;
};
