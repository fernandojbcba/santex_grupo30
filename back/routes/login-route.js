const express = require('express');

const router = express.Router();
const { validateLoginRequest, handleValidationErrors } = require('../middleware/validationLoginMiddleware');
const { loginController } = require('../controllers/login-controller');

router.post('/', validateLoginRequest(), handleValidationErrors, loginController);
module.exports = router;
