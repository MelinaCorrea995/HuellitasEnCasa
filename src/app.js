var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importar rutas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users'); // Corregir el require de usersRouter
const adoptionRoutes = require('./routes/adoptions'); // Asegúrate de que sea adoptionRoutes
const adminRoutes = require('./routes/admin'); // Este parece estar correcto

var app = express();

// Configuración de la vista
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/adoptions', adoptionRoutes); // Asegúrate de que sea adoptionRoutes
app.use('/admin', adminRoutes);

// Manejador de errores 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  // Configura locals para los errores
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza la página de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
