const express = require('express');

const router = express.Router();
const attendanceController = require('../controllers/attendance-controller');
const authenticateToken = require('../middleware/authenticate.token');
const isAdmin = require('../middleware/isAdminMiddleware');

router.get('/date', attendanceController.getAttendanceByDateAndCourse);
router.get('/date-range', attendanceController.getAttendanceByDateRange);
router.post('/', authenticateToken, isAdmin, attendanceController.createAttendance);

module.exports = router;
