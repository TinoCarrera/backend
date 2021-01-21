const { check, validationResult } = require("express-validator");

exports.validateSignup = [
  check("firstName").notEmpty().withMessage("Coloca tu nombre"),
  check("lastName").notEmpty().withMessage("Coloca tu apellido"),
  check("username").notEmpty().withMessage("Coloca un nombre de usuario"),
  check("email")
    .notEmpty()
    .withMessage("Coloca un correo electrónico")
    .isEmail()
    .withMessage("Coloca un correo electrónido válido"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Coloca una contraseña de al menos 6 caracteres"),
];

exports.validateLogin = [
  check("username")
    .notEmpty()
    .withMessage("Coloca tu nombre de usuario o correo electrónico"),
  check("password").isLength({ min: 6 }).withMessage("Coloca tu contraseña"),
];

exports.isValidated = async (req, res, next) => {
  const errors = await validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
