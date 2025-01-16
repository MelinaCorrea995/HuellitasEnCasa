const express = require('express'); 
const router = express.Router();
const path = require('path');
const animals = require(path.join(__dirname, '../../data/animals.json')); // Ruta al JSON con los datos de animales
const { adoptDetail, adoptStories } = require("../controllers/adoptionController");

// Ruta para mostrar los detalles de un animal
router.get('/adoptDetail/:id', adoptDetail);
router.get("/adoptStories",adoptStories);

module.exports = router;
