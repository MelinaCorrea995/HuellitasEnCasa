var express = require('express');
var router = express.Router();
const { register, login, showProfile, processRegister, processLogin } = require('../controllers/userController');
const isAuthenticated = require('../middleware/isAuthenticated');

// GET /users/register
router.get("/register", register);
// POST /users/register
router.post("/register", processRegister);
// GET /users/login 
router.get("/login", login);
// POST /users/login
router.post("/login", processLogin);
// Ruta para mostrar el formulario de adopción
router.get('/preAdopt', (req, res) => {
  res.render('animals/preAdopt');
});

// Ruta para mostrar el perfil del usuario (con autenticación)
router.get('/profile', isAuthenticated, showProfile);

module.exports = router;




