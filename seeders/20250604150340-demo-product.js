'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

 return queryInterface.bulkInsert ( 'Products', [
{
  name: "Toldo enrollable para furgoneta (2.5m)",
  price: 280,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  name: 'Saco de dormir momia -10°C',
  price: 95,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
    name: 'Linterna frontal LED recargable 500 lúmenes',
    price: 30.25,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Inversor de corriente 12V a 220V (1000W)',
    price: 110,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Ducha solar portátil 20 litros',
    price: 22.80,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]);
},

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
