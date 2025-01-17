const express = require('express'); 
const router = express.Router();
const path = require('path');
const { adoptDetail } = require("../controllers/adoptionController");

// Ruta para mostrar los detalles de un animal
router.get('/adoptDetail/:id', adoptDetail);

module.exports = router;
