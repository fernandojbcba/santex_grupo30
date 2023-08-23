const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {
    static associate(models) {
      // Define las asociaciones aquí
      Course.belongsToMany(models.User, { through: 'UserCourse', foreignKey: 'CourseId', as: 'users' });
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
    },
    {
      sequelize,
      modelName: 'Course',
    },
  );

  return Course;
};
