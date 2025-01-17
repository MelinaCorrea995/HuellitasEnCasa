const express = require('express'); 
const router = express.Router();
const path = require('path');
const { adoptDetail, adoptStories } = require("../controllers/adoptionController");

// Ruta para mostrar los detalles de un animal
router.get('/adoptDetail/:id', adoptDetail);
router.get("/adoptStories",adoptStories);

module.exports = router;
