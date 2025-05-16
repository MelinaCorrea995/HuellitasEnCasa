'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Adoptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName:'Users',
          },
          key: 'id'
        }
      },
      animalId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName:'Animals',
          },
          key: 'id'
        }
      },
      status : {
        type: Sequelize.ENUM('En proceso','Cancelada','Confirmada')
      },
      reasons : {
        type: Sequelize.TEXT
      },
      dwelling : {
        type : Sequelize.ENUM('Casa','Departamento','PH','Quinta')
      },
      rent : {
        type : Sequelize.BOOLEAN
      },
      petsAllowed :{
        type : Sequelize.BOOLEAN
      },
      allergy : {
        type : Sequelize.BOOLEAN
      },
      underTreatment : {
        type : Sequelize.BOOLEAN
      },
      dateAdoption: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Adoptions');
  }
};