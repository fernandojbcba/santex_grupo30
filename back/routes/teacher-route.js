const express = require('express');

const router = express.Router();
const authenticateToken = require('../middleware/authenticate.token');
const teacherController = require('../controllers/teacherCourse-controller');
const isAdmin = require('../middleware/isAdminMiddleware');
const isTeacher = require('../middleware/isTeacherMiddleware');

router.get('/enrolled/:teacherId', authenticateToken, isTeacher, teacherController.getTeacherEnrolledCourses);
router.post('/enrolled/teachercourse', authenticateToken, isAdmin, teacherController.addTeacherCourseController);
router.delete('/delete-teachercourse/:id', authenticateToken, isAdmin, teacherController.deleteTeacherCourseController);// id model UserTeacherCourse
router.get('/getTeacher/:courseId', authenticateToken, isAdmin, teacherController.getTeacher);
module.exports = router;
