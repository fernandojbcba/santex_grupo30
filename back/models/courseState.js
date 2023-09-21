const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CourseState extends Model {
    static associate(models) {
      // Define las asociaciones
      CourseState.hasMany(models.Course, {
        foreignKey: 'courseStateId',
        as: 'courses',
      });
    }
  }

  CourseState.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Cada estado debe tener un nombre único
      },

      createdAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CourseState',
    },
  );

  return CourseState;
};
