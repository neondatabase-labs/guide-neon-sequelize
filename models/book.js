'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.Author, {
        foreignKey: 'authorId',
        as: 'author',
        onDelete: 'CASCADE'
      });
    }
  }
  Book.init({
    title: { type: DataTypes.STRING, allowNull: false },
    authorId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};