const { check } = require('express-validator');

function validateLoginRequest() {
  return [
    check('email').isEmail().withMessage('El campo "email" debe ser una dirección de correo electrónico válida'),
    check('password').notEmpty().withMessage('El campo "password" no puede estar vacío'),
  ];
}

function handleValidationErrors(err, req, res, next) {
  if (err.name === 'ValidationError') {
    const errors = err.errors.map((error) => ({
      field: error.field,
      message: error.message,
    }));

    return res.status(400).json({ errors });
  }

  return next(err); // Asegúrate de que haya un return aquí
}

module.exports = { validateLoginRequest, handleValidationErrors };
