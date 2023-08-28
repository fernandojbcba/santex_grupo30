const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserTeacherCourse extends Model {
    static associate(models) {
      UserTeacherCourse.belongsTo(models.User, { foreignKey: 'UserId' });
      UserTeacherCourse.belongsTo(models.Course, { foreignKey: 'CourseId' });
    }
  }
  UserTeacherCourse.init(
    {
      UserId: DataTypes.INTEGER,
      CourseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserTeacherCourse',
    },
  );
  return UserTeacherCourse;
};
