"use strict";
const {City} = require('../models');

const animalesJSON = require('../../data/aminales.json');


const cities = [...new Map(
  animalesJSON.map(item => [
      item.zone,
      {
          name: item.zone,
      }
  ])
)].map(([_, value]) => value);

const animals = animalesJSON.map(({name,sex,age, zone, description, image, specie}) => {
  return {
    name,
    age,
    sex,
    description,
    image,
    specieId : specie,
    cityId : (cities.findIndex(city => city.name == zone) + 1),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Animals",
      animals,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Animals", null, {});
  },
};
