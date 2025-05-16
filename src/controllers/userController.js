const { validationResult } = require('express-validator');
const db = require('../database/models');
const { hashSync } = require('bcrypt');

const list = async (req, res) => {
  try {
    const users = await db.User.findAll({
      include: [
        {
          association: "rol"
        },
        {
          association: "city"
        }
      ]
    });
    return res.render("users/usersList", {
      users
    });
  } catch (error) {
    console.log(error);
  }
};

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
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const cities = await db.City.findAll({
        order: [
          ['name', 'ASC']
        ]
      })
      return res.render("users/register", {
        errors: errors.mapped(),
        oldData: req.body,
        cities
      });
    }else {
      const { name, surname, email, password, phone, address, cityId } = req.body;

      const hashedPassword = hashSync(password, 10);
    
      await db.User.create({
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim(),
        password: hashedPassword,
        phone: phone.trim(),
        address: address.trim(),
        cityId,
        rolId: 2
      });
      return res.redirect("/users/login");
    }
  
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  return res.render("users/login");
};

const processLogin = async (req, res) => {
  try {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.render("users/login", {
        errors: errors.mapped(),
        oldData: req.body
      });
    }else {
      const { email } = req.body;

      const user = await db.User.findOne({
        where: {
          email
        }
      });
  
      req.session.userLogin = {
        id: user.id,
        name: user.name,
        rol: user.roleId
      }; // Guardamos al usuario en sesión
  
      if (req.body.remember) {
        res.cookie("userLoginHuellitas", req.session.userLogin, { maxAge: 1000 * 60 * 60 * 24 * 30 }); // 30 días
      }
  
      return res.redirect(user.roleId == 1 ? "/admin" : "/users/profile");
    }
  } catch (error) {
    console.log(error);
  }
};

async function showProfile(req, res) {
  const user = await db.User.findByPk(req.session.userLogin.id, {
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
  res.render('users/profile', { user });
};

async function actualizarUsuario(userId, name, surname, email, username, password) {
  try {
    const resultado = await dbUser.update({
      name: name.trim(),
      surname: surname.trim(),
      email: email.trim(),
      username: username ? username.trim() : undefined,
      password: password ? hashSync(password, 10) : undefined
    }, {
      where: { id: userId }
    });

    return resultado;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

function logout(req, res) {
  req.session.destroy();
  res.clearCookie("userLoginHuellitas");
  return res.redirect("/");
};

module.exports = {
  list,
  processRegister,
  register,
  login,
  processLogin,
  showProfile,
  actualizarUsuario,
  logout
};


