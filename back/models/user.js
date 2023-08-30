const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Define las asociaciones aquí
      User.belongsTo(models.Role, { foreignKey: 'RoleId', as: 'role' });
      User.belongsToMany(models.Course, {
        through: 'UserCourse',
        foreignKey: 'UserId',
        otherKey: 'CourseId',
        as: 'courses', // cursos y usuarios inscriptos
      });
      User.belongsToMany(models.Course, {
        through: 'UserTeacherCourse',
        foreignKey: 'UserId',
        otherKey: 'TeacherCourseId',
        as: 'TeacherCourses', // cursos en que el usuario es teacher
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );

  return User;
};
