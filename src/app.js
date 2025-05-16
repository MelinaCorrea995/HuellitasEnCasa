var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session'); // Importamos express-session
const methodOverride = require('method-override'); // Importamos method-override

// Importar rutas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adoptionsRoutes = require('./routes/adoptions');
const animalsRoutes = require('./routes/animals');
const userLocals = require('./middleware/userLocals');
const apisRouter = require('./routes/api');
// const cors = require('cors');

var app = express();

// Configuración de la sesión
app.use(session({
  secret: 'mySecret', // Cambia esto por una cadena secreta más segura en producción
  resave: false,
  saveUninitialized: true,
}));

app.use(userLocals);

// Configuración de la vista
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Utiliza el parámetro _method para enviar solicitudes PUT y DELETE desde formularios HTML

// app.use(cors());

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/adoptions', adoptionsRoutes);
app.use('/animals', animalsRoutes);
app.use('/api', apisRouter);

// Manejador de errores 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
