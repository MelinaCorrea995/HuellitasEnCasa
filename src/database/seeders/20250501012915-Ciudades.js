"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Cities",
      [
        {
          name: "San Miguel",
          province : "Buenos Aires",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Loma Hermosa",
          province : "Buenos Aires",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cities", null, {});
  },
};
