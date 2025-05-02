'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Animal.belongsTo(models.City, {
        as : 'city',
        foreignKey : 'cityId'
      })
    }
  }
  Animal.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    sex: DataTypes.STRING,
    description: DataTypes.STRING,
    image : DataTypes.STRING,
    specieId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Animal',
  });
  return Animal;
};