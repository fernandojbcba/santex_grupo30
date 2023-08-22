const express = require('express');

const router = express.Router();
const userController = require('../controllers/user-controller');
const authenticateToken = require('../middleware/authenticate.token');

router.post('/', userController.createUser);
router.put('/:userId', authenticateToken, userController.updateUser);
router.delete('/:userId', authenticateToken, userController.deleteUser);
// router.get('/usercourse', userController.getEnrolledCourses);
// router.get('/enrolled-courses', authenticateToken, userController.getEnrolledCourses);
// router.get('/enrolled/:userId', authenticateToken, userController.CreateUser);

module.exports = router;
