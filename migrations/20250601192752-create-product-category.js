/*'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductId: {
        type: Sequelize.INTEGER
      },
      CategoryId: {
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
    await queryInterface.dropTable('ProductCategories');
  }
};*/

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductCategory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',  // Nombre exacto de la tabla de géneros
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
    await queryInterface.addIndex('ProductCategory', {
      fields: ['ProductId', 'CategoryId'],
      unique: true,
      name: 'unique_product_category' // Nombre del índice
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductCategory');
  }
};