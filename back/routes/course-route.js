const express = require('express');

const router = express.Router();
const courseController = require('../controllers/courses-controller');
const authenticateToken = require('../middleware/authenticate.token');
const userController = require('../controllers/userCourse-controller');

router.get('/list', courseController.getAllCourses);
// router.get('/usercourse', userController.getEnrolledCourses);
// router.get('/enrolled-courses', authenticateToken, userController.getEnrolledCourses);
router.get('/enrolled/:userId', authenticateToken, courseController.getEnrolledCourses);
router.post('/enrolled/usercourse', authenticateToken, userController.addUserCourseController);
module.exports = router;
