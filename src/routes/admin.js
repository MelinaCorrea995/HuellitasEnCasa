const express = require('express');
const router = express.Router();
require('../controllers/adminController');
const adminController = require('../controllers/adminController');
// Ruta para la página de administración
// router.get('/', showAdminPage);
router.get('/', adminController.showAdminPage);
router.post('/', adminController.createAnimal);       // Crea un nuevo animal
router.put('/:id', adminController.updateAnimal);     // Actualiza un animal
router.delete('/:id', adminController.deleteAnimal); //elimina un animal

module.exports = router;
