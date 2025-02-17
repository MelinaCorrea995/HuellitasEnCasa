const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Encriptar la contraseña
async function encryptPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error al encriptar la contraseña');
  }
}

// Comparar la contraseña ingresada con la almacenada
async function comparePassword(inputPassword, storedPassword) {
  try {
    return await bcrypt.compare(inputPassword, storedPassword);
  } catch (error) {
    throw new Error('Error al comparar las contraseñas');
  }
}

// Guardar los datos del usuario en el archivo JSON
async function saveUserData(userData, imagePath) {
  try {
    const usersFilePath = path.join(__dirname, '../data/users.json');
    let users = [];
    
    if (fs.existsSync(usersFilePath)) {
      users = JSON.parse(fs.readFileSync(usersFilePath));
    }
    
    const newUser = {
      ...userData,
      password: await encryptPassword(userData.password), // Encriptar la contraseña
      profileImage: imagePath // Guardar la ruta de la imagen
    };

    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    throw new Error('Error al guardar los datos del usuario');
  }
}

// Buscar un usuario por su email
async function getUserByEmail(email) {
  try {
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')));
    return users.find(user => user.email === email); // Devolver el usuario que coincida con el email
  } catch (error) {
    throw new Error('Error al buscar el usuario');
  }
}

// Función para registrar el usuario
async function register(userData, imagePath) {
  try {
    await saveUserData(userData, imagePath);
  } catch (error) {
    throw new Error('Error al registrar el usuario');
  }
}

// Función para manejar el login del usuario
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por su email
    const user = await getUserByEmail(email);
    
    if (!user) {
      return res.status(400).send('Email o contraseña incorrectos');
    }

    // Verificar la contraseña con bcrypt
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Email o contraseña incorrectos');
    }

    // Aquí puedes manejar la sesión o redirigir al perfil
    req.session.user = user; // Usando express-session para guardar la sesión
    res.redirect('/profile');  // Redirigir al perfil o a la página deseada
  } catch (error) {
    res.status(500).send('Error al iniciar sesión');
  }
}

// Middleware de autenticación
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next(); // Si está logueado, pasa al siguiente middleware o ruta
  }
  res.redirect('/users/login'); // Si no está logueado, redirige al login
}

// Función para mostrar el perfil del usuario (con autenticación)
async function showProfile(req, res) {
  if (!req.session.user) {
    return res.redirect('/users/login'); // Si no está logueado, redirige al login
  }

  // Mostrar los datos del usuario en el perfil
  res.render('profile', { user: req.session.user });
}

module.exports = {
  register,
  login,
  showProfile, // Exportamos la función para el perfil
  isAuthenticated // Exportamos el middleware
};
    
    // En el código anterior, hemos creado la función  showProfile  que se encarga de mostrar el perfil del usuario. Esta función verifica si el usuario está autenticado y, si lo está, muestra los datos del usuario en la vista del perfil. 
    // Para verificar si el usuario está autenticado, hemos creado un middleware llamado  isAuthenticated  que verifica si el usuario tiene una sesión activa. Si el usuario no está autenticado, redirige al usuario a la página de inicio de sesión.
    // En la función  showProfile , hemos utilizado la propiedad  req.session.user  para obtener los datos del usuario que está autenticado. Esta propiedad se establece cuando el usuario inicia sesión y se almacena en la sesión del servidor.
    // Para utilizar la sesión en Express, necesitamos instalar el paquete  express-session . Este paquete nos permite almacenar la sesión del usuario en el servidor y acceder a ella en las peticiones posteriores. Para instalar el paquete, ejecuté el siguiente comando: npm install express-session. 
    // Luego, configuramos la sesión en nuestra aplicación Express de la siguiente manera:  app.use(session ({ secret: 'mySecretKey', resave: false, saveUninitialized: false })); .
    


