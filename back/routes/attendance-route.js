const express = require('express');

const router = express.Router();
const attendanceController = require('../controllers/attendance-controller');
const authenticateToken = require('../middleware/authenticate.token');
const isAdmin = require('../middleware/isAdminMiddleware');

router.get('/date', authenticateToken, isAdmin, attendanceController.getAttendanceByDateAndCourse);
router.get('/date-range', authenticateToken, isAdmin, attendanceController.getAttendanceByDateRange);
router.get('/present-date-range', authenticateToken, isAdmin, attendanceController.getPresentsByDateRange);
router.get('/absent-date-range', authenticateToken, isAdmin, attendanceController.getAbsentAttendanceByDateRange);
router.get('/late-date-range', authenticateToken, isAdmin, attendanceController.getLateAttendanceByDateRange);
router.post('/', authenticateToken, isAdmin, attendanceController.createAttendance);

module.exports = router;
