const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Attendance extends Model {
    static associate(models) {
      // Define las asociaciones aquí
      Attendance.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' });
      Attendance.belongsTo(models.Course, { foreignKey: 'CourseId', as: 'course' });
      Attendance.belongsTo(models.Status, { foreignKey: 'StatusId', as: 'status' });
    }
  }

  Attendance.init(

    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'UserId',
      },
      CourseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'CourseId',
      },
      StatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'StatusId',
      },
      date: {
        // type: DataTypes.DATE,
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'date',
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'isDeleted',
      },
      createdAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'createdAt',
      },
      updatedAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'updatedAt',
      },

    },
    {
      sequelize,
      modelName: 'Attendance',
      freezeTableName: true, // Esto evita la inflexión de nombres de tabla en plural
      tableName: 'attendance', // Nombre real de la tabla en tu base de datos
      timestamps: true,
      underscored: true,
      defaultScope: {
        attributes: {
          // Excluye campos de control interno de Sequelize por defecto
          createdAt: undefined,
          updatedAt: undefined,
          // deletedAt: undefined,
        },
      },
    },
  );

  return Attendance;
};
