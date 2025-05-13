// adminController.js contiene las funciones que se encargan de manejar las solicitudes HTTP para la administración de animales. En este caso, se encargan de mostrar la página de administración, crear un nuevo animal, editar un animal existente y eliminar un animal
const express = require('express');
const router = express.Router();

const {
  add,
  create,
  list,
  detail,
  edit,
  update,
  remove
} = require("../controllers/animalController"); // Importar desde adminController
const uploadFile = require('../middleware/uploadFile');

// Ruta para obtener todos los animales (Leer)
router.get('/', list);

// Ruta para obtener un animal por su ID (Leer)
router.get('/detail/:id', detail);

// Ruta para crear un nuevo animal (Crear)
router.get('/create', add);

// Ruta para crear un nuevo animal (Crear)
router.post('/create', uploadFile.single('image'), create);

router.get('/edit/:id', edit);

// Ruta para actualizar un animal por su ID (Actualizar)
router.put('/update/:id', uploadFile.single('image'), update);

// Ruta para eliminar un animal por su ID (Eliminar)
router.delete('/remove/:id', remove);

module.exports = router;


