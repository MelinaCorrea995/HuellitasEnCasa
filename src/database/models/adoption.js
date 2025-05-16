'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Adoption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Adoption.init({
    userId: DataTypes.INTEGER,
    animalId: DataTypes.INTEGER,
    status: DataTypes.ENUM('En proceso','Cancelada','Confirmada'),
    reasons: DataTypes.TEXT,
    dwelling: DataTypes.ENUM('Casa','Departamento','PH','Quinta'),
    rent: DataTypes.BOOLEAN,
    petsAllowed : DataTypes.BOOLEAN,
    allergy : DataTypes.BOOLEAN,
    underTreatment : DataTypes.BOOLEAN,
    dateAdoption: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Adoption',
  });
  return Adoption;
};