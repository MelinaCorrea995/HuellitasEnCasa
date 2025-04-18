const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Importar rutas
const adminRoutes = require('./routes/admin');
const adoptionRoutes = require('./routes/adoptions');
const usersRoutes = require('./routes/users');
const indexRoutes = require('./routes/index');

// Configuración de la aplicación
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para que pueda procesar los formularios con body

// Configuración de vistas
app.set('view engine', 'ejs'); // Usamos EJS como motor de plantillas
app.set('views', path.join(__dirname, 'views')); // Definir la carpeta donde están las vistas

// Rutas
app.use('/', indexRoutes); // Ruta de la página de inicio
app.use('/admin', adminRoutes); // Ruta para administración
app.use('/adoption', adoptionRoutes); // Ruta para adopciones
// app.use('/users', usersRoutes); // Ruta para usuarios
app.use('/users', require('./routes/users'));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

