const express = require('express');

const router = express.Router();
const attendanceController = require('../controllers/attendance-controller');
const authenticateToken = require('../middleware/authenticate.token');
const isTeacher = require('../middleware/isTeacherMiddleware');

router.get('/date', attendanceController.getAttendanceByDateAndCourse);
router.get('/date-range', attendanceController.getAttendanceByDateRange);
router.post('/', authenticateToken, isTeacher, attendanceController.createAttendance);

module.exports = router;
