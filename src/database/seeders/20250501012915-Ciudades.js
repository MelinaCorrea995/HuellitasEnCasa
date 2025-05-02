"use strict";
const animales = require('../../data/aminales.json')

const cities = [...new Map(
  animales.map(item => [
      item.zone,
      {
          name: item.zone,
          province: item.zone === 'Devoto' || item.zone === 'Barracas' ? 'CABA' : 'Buenos Aires',
          createdAt: new Date(),
          updatedAt: new Date()
      }
  ])
)].map(([_, value]) => value);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Cities",
      cities,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cities", null, {});
  },
};
