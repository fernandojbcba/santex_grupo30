const express = require('express');

const router = express.Router();
const courseController = require('../controllers/courses-controller');
const authenticateToken = require('../middleware/authenticate.token');
const userCourseController = require('../controllers/userCourse-controller');
const isAdmin = require('../middleware/isAdminMiddleware');

router.get('/list', courseController.getAllCourses);
router.get('/enrolled/:userId', authenticateToken, courseController.getEnrolledCourses);
router.post('/enrolled/usercourse', authenticateToken, userCourseController.addUserCourseController);
router.post('/', authenticateToken, isAdmin, courseController.createCourse);
router.put('/:courseId', authenticateToken, isAdmin, courseController.updateCourse);
router.delete('/:courseId', authenticateToken, isAdmin, courseController.deleteCourse);
module.exports = router;
