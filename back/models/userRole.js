module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // claves
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RoleId: {
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
  });

  // Define las asociaciones
  UserRole.associate = (models) => {
    UserRole.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE',
    });
    UserRole.belongsTo(models.Role, {
      foreignKey: 'RoleId',
      onDelete: 'CASCADE',
    });
  };

  return UserRole;
};
