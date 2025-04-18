var express = require('express');
var router = express.Router();
const { register, login, showProfile, isAuthenticated } = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const { title } = require('process');

// Configuración de Multer
storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/users/')); // Dirección donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Crear nombre único
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Nombre de archivo con extensión
  }
});

const upload = multer({ storage: storage });

// POST /users/register
router.post("/register", upload.single('profileImage'), async (req, res) => {
  try {
    const userData = req.body; // Obtener datos del formulario
    const imagePath = req.file ? req.file.path : ''; // Ruta de la imagen subida (si existe)
    console.log("holaa")
    // Llamamos al controlador para guardar los datos (encriptación de la contraseña y guardado)
    await register(userData, imagePath); 

    res.status(200).send('Usuario registrado exitosamente');
  } catch (error) {
    res.status(500).send('Hubo un error al registrar al usuario');
  }
});

// GET /users/login 
// router.get("login"/login)
router.get("/login", (req,res) => { 
  res.render("users/login");
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await login(email, password);

    if (!user) {
      return res.render("users/login", { error: "Credenciales inválidas" });
    }

    req.session.user = user;
    res.redirect("/users/profile");

  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send("Error al iniciar sesión");
  }
});

router.get('/preAdopt', (req, res) => {
  res.render('animals/preAdopt');
});

// GET /users/register
router.get("/register", (req,res) => {
  res.render("users/register");
});
// Ruta para mostrar el perfil del usuario (con autenticación)
router.get('/profile', isAuthenticated, showProfile);

module.exports = router;




