const express = require('express');
const router = express.Router();
const path = require('path');
const animals = require(path.join(__dirname, '../data/db.json')); // Ruta al JSON con los datos de animales
const adoptionController = require('../controllers/adoptionController');


// Ruta para mostrar los detalles de un animal 
router
    .get('/preAdopt/:id', adoptionController.preAdopt)
    .post('/preAdopt/:id', adoptionController.processPreAdoption)

module.exports = router;



