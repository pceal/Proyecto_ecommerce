'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        
      Order.belongsTo(models.User)
      Order.belongsToMany(models.Product, {
        through: models.OrderProduct, // Usa el modelo, no el nombre como string
        foreignKey: "OrderId", // FK que apunta desde GenreBook hacia Book
        as: "Products", // Debe coincidir con el alias en el include
      });
    }
  }
  Order.init({
    number: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};