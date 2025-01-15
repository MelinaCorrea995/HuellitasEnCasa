const express = require('express'); 
const router = express.Router();
const path = require('path');
const animals = require(path.join(__dirname, '../data/animals.json')); // Ruta al JSON con los datos de animales
const {adoptDetail} = require("../controllers/adoptionController");
// Ruta para mostrar los detalles de un animal
router.get('/adoptDetail/:id', adoptDetail);
module.exports = router;

// Renderiza la pagina principal no tocar . Localhost:3000

// No se porque cuando pones localhost:3000/adoptions en el navegador sale el error 404 y el localhost:3000 no _ no se si son
//  la misma pagina 
// con el localhost:3000 que renderza sale la pagina principal...
