var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const adoptionRouter = require('./routes/adoption');

app.use('/adoption', adoptionRouter);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', adoptionRouter);

// Nueva ruta para manejar los detalles de los animales
app.get('/adoptDetail', (req, res) => {
  const animalId = req.query.id; // Captura el parámetro id de la URL
  if (animalId) {
    res.render('adoptDetail', { id: animalId }); // Renderiza la vista adoptDetail.ejs y pasa el id
  } else {
    res.status(400).send('ID no proporcionado');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
