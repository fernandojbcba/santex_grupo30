const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User); // Un rol tiene muchos usuarios
    }
  }

  Role.init(
    {
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Role',
    },
  );

  return Role;
};
