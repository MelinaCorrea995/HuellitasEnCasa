"use strict";
require('dotenv').config();
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Admin",
          surname : "Huellitas",
          email : "admin@gmail.com",
          password : bcrypt.hashSync(process.env.PASSWORD_ADMIN, 10),
          address : 'Siempre Viva 1234',
          cityId : 1,
          roleId : 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "User",
          surname : "Huellitas",
          email : "user@gmail.com",
          password : bcrypt.hashSync(process.env.PASSWORD_ADMIN, 10),
          address : 'Siempre Viva 1234',
          cityId : 2,
          roleId : 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
