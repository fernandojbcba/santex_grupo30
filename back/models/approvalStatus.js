const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ApprovalStatus extends Model {
    static associate() {
      // No es necesario cargar asociación

    }
  }

  ApprovalStatus.init(
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
      modelName: 'ApprovalStatus',
    },
  );

  return ApprovalStatus;
};
