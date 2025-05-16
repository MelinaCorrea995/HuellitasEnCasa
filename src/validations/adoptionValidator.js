const { check } = require("express-validator");
const db = require("../database/models");

const adoptionValidator = [
    check("name")
        .notEmpty().withMessage("El nombre es requerido"),
    check("surname")
       .notEmpty().withMessage("El apellido es requerido"),
    check("email")
        .notEmpty().withMessage("El email es requerido").bail()
        .isEmail().withMessage("El email debe ser válido").bail()
        .custom((value) => {
            return db.User.findOne({ where: { email: value } })
            .then((user) => {
                if (user) {
                    return Promise.reject(
                        new Error("El email ya está registrado")
                    )}
                })
            }),
    check("phone")
       .notEmpty().withMessage("El teléfono es requerido"),
    check("reasons")
      .notEmpty().withMessage("El motivo de la adopción es requerido"),
    check("petsAllowed")
      .notEmpty().withMessage("Debe informar si se aceptan mascotas"),
    check("allergy")
     .notEmpty().withMessage("Debe informar acerca de las alergias"),
    check("underTreatment")
     .notEmpty().withMessage("Debe informar acerca de los tratamientos"),
]

module.exports = adoptionValidator