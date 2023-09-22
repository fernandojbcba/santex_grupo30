const express = require('express');

const router = express.Router();
const { loginController } = require('../controllers/login-controller');
const { validateLoginRequest, handleValidationErrors } = require('../middleware/validationLoginMiddleware');

router.post('/', validateLoginRequest(), handleValidationErrors, loginController);
module.exports = router;
