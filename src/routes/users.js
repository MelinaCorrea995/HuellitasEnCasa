var express = require('express');
var router = express.Router();
const { list, register, login, showProfile, processRegister, processLogin, logout } = require('../controllers/userController');
const isAuthenticated = require('../middleware/isAuthenticated');

/* GET users listing. */
router.get('/', list);
// GET /users/register
router.get("/register", register);
// POST /users/register
router.post("/register", processRegister);
// GET /users/login 
router.get("/login", login);
// POST /users/login
router.post("/login", processLogin);
// GET /users/profile
router.get("/profile", isAuthenticated, showProfile);
// GET /users/logout
router.get("/logout", logout);
// Ruta para mostrar el formulario de adopción
router.get('/preAdopt', (req, res) => {
  res.render('animals/preAdopt');
});

// Ruta para mostrar el perfil del usuario (con autenticación)
router.get('/profile', isAuthenticated, showProfile);

module.exports = router;




