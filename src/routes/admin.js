const express = require('express');
const router = express.Router();
const { showAdminPage } = require('../controllers/adminController');

// Ruta para la página de administración
router.get('/', showAdminPage);

module.exports = router;
