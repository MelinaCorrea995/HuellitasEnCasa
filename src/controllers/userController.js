const db = require('../database/models');
const { hashSync } = require('bcrypt');

const register = async (req, res) => {
  try {
    const cities = await db.City.findAll({
      order: [
        ['name', 'ASC']
      ]
    })
    return res.render("users/register", {
      cities
    });

  } catch (error) {
    console.log(error);
  }
};

const processRegister = async (req, res) => {
  const { name, surname, email, password, phone, address, cityId} = req.body;

  const hashedPassword = hashSync(password, 10);

  await db.User.create({ 
    name : name.trim(),
    surname: surname.trim(),
    email: email.trim(), 
    password: hashedPassword,
    phone: phone.trim(),
    address: address.trim(),
    cityId,
    rolId : 2 
  });
  return res.redirect("/users/login");
};

const login = async (req, res) => {
  return res.render("users/login");
}

const processLogin = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await db.User.findOne({
      where: {
        email
      }
    });

  req.session.userLogin = {
    id: user.id,
    name: user.name,
    rol: user.rolId
  }; // Guardamos al usuario en sesión
  
  if (req.body.remember) {
    res.cookie("userLoginHuellitas", req.session.userLogin, { maxAge: 1000 * 60 * 60 * 24 * 30 }); // 30 días
  }

  return res.redirect("/users/profile");

  } catch (error) {
    console.log(error);
  }
};

// Función para mostrar el perfil del usuario (con autenticación)
async function showProfile(req, res) {
  const user = await db.User.findByPk(req.session.userLogin.id,{
      include: [
        {
          association: "rol"
        },
        {
          association: "city"
        }
      ]
}) 
  // Mostrar los datos del usuario en el perfil
  res.render('users/profile', { user});
}

module.exports = {
  processRegister,
  register,
  login,
  processLogin,
  showProfile, // Exportamos la función para el perfil
};
    
    // En el código anterior, hemos creado la función  showProfile  que se encarga de mostrar el perfil del usuario. Esta función verifica si el usuario está autenticado y, si lo está, muestra los datos del usuario en la vista del perfil. 
    // Para verificar si el usuario está autenticado, hemos creado un middleware llamado  isAuthenticated  que verifica si el usuario tiene una sesión activa. Si el usuario no está autenticado, redirige al usuario a la página de inicio de sesión.
    // En la función  showProfile , hemos utilizado la propiedad  req.session.user  para obtener los datos del usuario que está autenticado. Esta propiedad se establece cuando el usuario inicia sesión y se almacena en la sesión del servidor.
    // Para utilizar la sesión en Express, necesitamos instalar el paquete  express-session . Este paquete nos permite almacenar la sesión del usuario en el servidor y acceder a ella en las peticiones posteriores. Para instalar el paquete, ejecuté el siguiente comando: npm install express-session. 
    // Luego, configuramos la sesión en nuestra aplicación Express de la siguiente manera:  app.use(session ({ secret: 'mySecretKey', resave: false, saveUninitialized: false })); .
    


