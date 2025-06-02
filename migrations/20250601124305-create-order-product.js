/*'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OrderId: {
        type: Sequelize.INTEGER
      },
      ProductId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderProducts');
  }
};*/
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderProduct', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OrderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',  // Nombre exacto de la tabla de géneros
          key: 'id'
        },
        onUpdate: 'CASCADE', // Actualiza en cascada
        onDelete: 'CASCADE'  // Borra en cascada
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',   // Nombre exacto de la tabla de libros
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Añade esto para evitar duplicados
    await queryInterface.addIndex('OrderProduct', {
      fields: ['OrderId','ProductId' ],
      unique: true,
      name: 'unique_order_product' // Nombre del índice
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderProduct');
  }
};