// adminController.js contiene las funciones que se encargan de manejar las solicitudes HTTP para la administración de animales. En este caso, se encargan de mostrar la página de administración, crear un nuevo animal, editar un animal existente y eliminar un animal
const express = require('express');
const router = express.Router();
const {
  adoptDetail,
  adoptStories
} = require("../controllers/adoptionController"); // Importar desde adoptionController

const {
  createAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal
} = require("../controllers/adminController"); // Importar desde adminController

// Ruta para obtener todos los animales (Leer)
router.get('/', getAllAnimals);

// Ruta para obtener los detalles de un animal por su ID (Leer)
router.get('/adoptDetail/:id', adoptDetail);

// Ruta para ver todas las historias de adopción (Leer)
router.get("/adoptStories", adoptStories);

// Ruta para crear un nuevo animal (Crear)
router.post('/', createAnimal);

// Ruta para actualizar un animal por su ID (Actualizar)
router.put('/:id', updateAnimal);

// Ruta para eliminar un animal por su ID (Eliminar)
router.delete('/:id', deleteAnimal);

module.exports = router;


