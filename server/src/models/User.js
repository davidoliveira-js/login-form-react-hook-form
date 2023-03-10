'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      paranoid: true,
      tableName: 'users',
      defaultScope: {
        where: {},
      },
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Post, {
      foreignKey: 'user_id',
    });
  };

  return User;
};
