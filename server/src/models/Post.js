'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      body: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
    {
      paranoid: true,
      tableName: 'posts',
      defaultScope: {
        where: {},
      },
    }
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
  return Post;
};
