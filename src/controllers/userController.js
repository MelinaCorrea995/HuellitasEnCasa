const db = require('../database/models');
const { hashSync } = require('bcrypt');
const { check } = require("express-validator");


let databaseConnection;
try {
    databaseConnection = require('../database/models');
} catch (error) {
    console.error('Error al conectar la base de datos:', error);
}

// const db = require("../database/models");
// const { compareSync } = require("bcrypt");

const userLoginValidator = [
    check("email")
        .notEmpty().withMessage("El email es requerido"),
    check("password")
        .notEmpty().withMessage("La contraseña es requerida").bail()
        .custom((value, { req }) => {
            return db.User.findOne({ where: { email: req.body.email } })
            .then((user) => {                
                if (!user || !compareSync(value, user.password)) {
                    return Promise.reject(
                        new Error("Las credenciales son inválidas")
                    );
                }
            })
            .catch((error) => {
                console.log(error);       
                return Promise.reject(
                    new Error(error ? error.message : "Error al verificar las credenciales")
                );
            })
        })
]


const profileUpdateValidator = [
  check("name")
      .notEmpty().withMessage("El nombre es requerido")
      .trim(),
  check("surname")
      .notEmpty().withMessage("El apellido es requerido")
      .trim(),
  check("email")
      .notEmpty().withMessage("El email es requerido")
      .isEmail().withMessage("El email debe ser válido")
      .trim()
      .custom(async (value, { req }) => {
          const user = await db.User.findOne({
              where: { email: value, id: { $ne: req.session.userLogin.id } }
          });
          if (user) {
              throw new Error("Este email ya está en uso");
          }
          return true;
      }),
  check("username")
      .optional()
      .matches(/^[a-zA-Z0-9_]{3,16}$/).withMessage("El nombre de usuario debe tener entre 3 y 16 caracteres, solo letras, números y guiones bajos")
      .trim()
      .custom(async (value, { req }) => {
          if (!value) return true;
          const user = await db.User.findOne({
              where: { username: value, id: { $ne: req.session.userLogin.id } }
          });
          if (user) {
              throw new Error("Este nombre de usuario ya está en uso");
          }
          return true;
      }),
  check("password")
      .optional()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .withMessage("La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos"),
  check("confirmPassword")
      .optional()
      .custom((value, { req }) => {
          if (req.body.password && !value) {
              throw new Error("Debes confirmar la contraseña");
          }
          if (value && value !== req.body.password) {
              throw new Error("Las contraseñas no coinciden");
          }
          return true;
      })
];

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
 db.User.update({
  name: name.trim(),
  surname: surname.trim(),
  email: email.trim(),
  username: username ? username.trim() : undefined,
  password: password ? hashSync(password, 10) : undefined
}, {
  where: { id: userId }
});

// Actualizar sesión
const updatedUser = await db.User.findByPk(userId);
req.session.userLogin = {
  id: updatedUser.id,
  name: updatedUser.name,
  rol: updatedUser.rolId
};

module.exports = userLoginValidator
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


module.exports = {
  processRegister,
  register,
  login,
  processLogin,
  showProfile, // Exportamos la función para el perfil
};


