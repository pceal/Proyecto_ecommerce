'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models){
  product.belongsToMany(models.Order, {
        through: models.OrderProduct, // Usa el modelo, no el nombre como string
        foreignKey: "ProductId", // FK que apunta desde GenreBook hacia Book
        as: "Orders", // Debe coincidir con el alias en el include
      });
     product.belongsToMany(models.Category, {
        through: models.ProductCategory, // Usa el modelo, no el nombre como string
        foreignKey: "ProductId", // FK que apunta desde GenreBook hacia Book
        as: "Categories", // Debe coincidir con el alias en el include
      });
      // define association here
    }
  }
  product.init({
    name:{
     type:DataTypes.STRING,
    allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce un producto",
        },
      },
    },
  
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce un precio",
        },
       
      },
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return product;
};