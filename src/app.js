var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session'); // Importamos express-session
const multer  = require('multer');

// Importar rutas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adoptionRoutes = require('./routes/adoptions');
const adminRoutes = require('./routes/admin');
// const cors = require('cors');

var app = express();

// Configuración de la sesión
app.use(session({
  secret: 'mySecret', // Cambia esto por una cadena secreta más segura en producción
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Asegúrate de configurarlo correctamente si usas HTTPS
}));

// Configuración de la vista
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// app.use(cors());

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/adoptions', adoptionRoutes);
app.use('/admin', adminRoutes);

// Manejador de errores 404
app.use(function(req, res, next) {
});

// Manejador de errores
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
console.log("servidor corriendo en :http://localhost:3000");
module.exports = app;
