const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Status extends Model {
    static associate(models) {
      //  asociaciones
      Status.hasMany(models.Attendance, {
        foreignKey: 'StatusId',
        as: 'attendances',
      });
    }
  }

  Status.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Status',
    },
  );

  return Status;
};
