'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate(models) { }
  }
  Author.init({
    name: { type: DataTypes.STRING, allowNull: false },
    bio: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Author',
  });
  return Author;
};