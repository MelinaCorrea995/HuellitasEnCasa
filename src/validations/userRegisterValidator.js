const { check } = require("express-validator");
const db = require("../database/models");

module.exports = [
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
                where: { email: value, }
            });
            if (user) {
                throw new Error("Este email ya está en uso");
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