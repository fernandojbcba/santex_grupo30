const express = require('express');

const router = express.Router();
const courseController = require('../controllers/courses-controller');
const authenticateToken = require('../middleware/authenticate.token');
const userCourseController = require('../controllers/userCourse-controller');
const teacherCourseController = require('../controllers/teacherCourse-controller'); // Importa el controlador de profesor-curso
const isAdmin = require('../middleware/isAdminMiddleware');
const isTeacher = require('../middleware/isTeacherMiddleware'); // Importa el middleware de profesor

router.get('/list', courseController.getAllCourses);
router.get('/:courseId', courseController.courseById);
router.get('/enrolled/:userId', authenticateToken, courseController.getEnrolledCourses);
router.post('/enrolled/usercourse', authenticateToken, userCourseController.addUserCourseController);
router.put('/enrolled/status', authenticateToken, isTeacher, userCourseController.putUserCourseController);
router.get('/:courseId/users', authenticateToken, isTeacher, teacherCourseController.getUsersInCourse);
router.post('/', authenticateToken, isAdmin, courseController.createCourse);
router.put('/:courseId', authenticateToken, isAdmin, courseController.updateCourse);

router.delete('/:courseId', authenticateToken, isAdmin, courseController.deleteCourse);
router.get('/course-states', authenticateToken, isTeacher, courseController.listCourseStates);

module.exports = router;
