
const express = require("express");
const router = express.Router();
const path = require("path");
const {  } = require("../controllers/happyStoryController.js");
const {adoptDetail} = require("../controllers/happyStoryController.js");

// Ruta para listar todos los animales
router.get('/adoptDetail/:id', adoptDetail);

module.exports = router;
