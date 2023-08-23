const express = require('express');

const router = express.Router();
const userController = require('../controllers/user-controller');
const authenticateToken = require('../middleware/authenticate.token');
const isAdmin = require('../middleware/isAdminMiddleware');

router.post('/', userController.createUser);
router.get('/list', authenticateToken, isAdmin, userController.getAllUsers);
router.put('/:userId', authenticateToken, userController.updateUser);
router.delete('/:userId', authenticateToken, isAdmin, userController.deleteUser);

module.exports = router;
