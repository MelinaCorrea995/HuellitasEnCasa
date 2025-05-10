// Middleware de autenticación
function isAuthenticated(req, res, next) {
  
    if (req.session.userLogin) {
      return next(); // Si está logueado, pasa al siguiente middleware o ruta
    }
    res.redirect('/users/login'); // Si no está logueado, redirige al login
  }
  module.exports = isAuthenticated;  