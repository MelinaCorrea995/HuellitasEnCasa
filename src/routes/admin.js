const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Ruta para la página de administración
router.get('/', adminController.showAdminPage);

module.exports = router;
