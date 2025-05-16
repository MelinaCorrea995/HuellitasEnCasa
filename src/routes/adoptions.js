const express = require('express');
const router = express.Router();
const adoptionController = require('../controllers/adoptionController');
const adoptionValidator = require('../validations/adoptionValidator');


// Ruta para mostrar los detalles de un animal 
router
    .get('/preAdopt/:id', adoptionController.preAdopt)
    .post('/preAdopt/:id', adoptionValidator, adoptionController.processPreAdoption)
    .get('/preAdoptThanks/:id', adoptionController.preAdoptThanks)
    .get('/adoptionsRegister', adoptionController.adoptionsRegister)

module.exports = router;



