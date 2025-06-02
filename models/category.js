'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { 
      Category.belongsToMany(models.Product, {
        through: models.ProductCategory, // Usa el modelo, no el nombre como string
        foreignKey: "CategoryId", // FK que apunta desde GenreBook hacia Book
        as: "Products", // Debe coincidir con el alias en el include
      });
      // define association here
    }
  }
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};