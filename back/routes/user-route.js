const express = require('express');

const router = express.Router();
const authenticateToken = require('../middleware/authenticate.token');
const userController = require('../controllers/user-Controller');
const isAdmin = require('../middleware/isAdminMiddleware');

router.post('/', userController.createUser);
router.put('/:userId', authenticateToken, userController.updateUser);
router.delete('/:userId', authenticateToken, isAdmin, userController.deleteUser);
router.get('/list', authenticateToken, isAdmin, userController.getAllUsers);
router.get('/profile/:userId', authenticateToken, userController.viewProfile);
router.get('/teachers', authenticateToken, isAdmin, userController.getAllTeachers);

module.exports = router;
