const express = require('express');

const router = express.Router();
const courseController = require('../controllers/courses-controller');
const authenticateToken = require('../middleware/authenticate.token');

router.get('/list', courseController.getAllCourses);
// router.get('/usercourse', userController.getEnrolledCourses);
// router.get('/enrolled-courses', authenticateToken, userController.getEnrolledCourses);
router.get('/enrolled/:userId', authenticateToken, courseController.getEnrolledCourses);

module.exports = router;
