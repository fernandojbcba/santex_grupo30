const express = require('express');

const router = express.Router();
const { loginController, createUser } = require('../controllers/login-controller');

router.post('/', loginController);
router.post('/register', createUser);
module.exports = router;
