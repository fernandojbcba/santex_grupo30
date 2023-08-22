const express = require('express');

const router = express.Router();
const authenticateToken = require('../middleware/authenticate.token');
const userController = require('../controllers/user-Controller');

router.get('/profile', authenticateToken, userController.viewProfile);

module.exports = router;
