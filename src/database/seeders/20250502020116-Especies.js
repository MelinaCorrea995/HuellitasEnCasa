"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Species",
      [
        {
          name: "Perro",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Gato",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Species", null, {});
  },
};
