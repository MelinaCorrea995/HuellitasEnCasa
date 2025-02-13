const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Ruta para la página de administración (mostrar los animales)
router.get('/admin', adminController.showAdminPage);

// Ruta para crear un nuevo animal (POST)
router.post('/create', adminController.createAnimal); // Cambié la ruta a '/create'

// Ruta para actualizar un animal por ID (PUT)
router.put('/:id', adminController.updateAnimal);

// Ruta para eliminar un animal por ID (DELETE)
router.delete('/:id', adminController.deleteAnimal);

module.exports = router;
