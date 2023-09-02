module.exports = (sequelize, DataTypes) => {
  const UserTeacherCourse = sequelize.define(
    'UserTeacherCourse',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      TeacherCourseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'userteachercourse', // nombre real de la tabla
    },
  );

  UserTeacherCourse.associate = (models) => {
    UserTeacherCourse.belongsTo(models.Course, {
      // foreignKey: 'CourseId',
      foreignKey: 'TeacherCourseId',
      onDelete: 'CASCADE',
    });

    UserTeacherCourse.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE',
    });
  };

  return UserTeacherCourse;
};
