const AttendanceService = require('../services/attendance-service');

const attendanceService = new AttendanceService();

async function createAttendance(req, res) {
  try {
    const {
      userId, courseId, statusId, date,
    } = req.body;
    const attendance = await attendanceService.createAttendance(
      userId,
      courseId,
      statusId,
      date,
    );
    res.status(201).json({ attendance });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}
async function getAttendanceByDateRange(req, res) {
  try {
    const { startDate, endDate } = req.query;
    const attendance = await attendanceService.getAttendanceByDateRange(
      startDate,
      endDate,
    );

    if (attendance.length === 0) {
      return res
        .status(404)
        .json({ message: 'No hay asistencias para el rango de fechas especificado.' });
    }

    return res.status(200).json({ attendance });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getAttendanceByDateAndCourse(req, res) {
  try {
    const { date, courseId } = req.query;
    const attendance = await attendanceService.getAttendanceByDateAndCourse(
      date,
      courseId,
    );
    res.status(200).json({ attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateAttendance(req, res) {
  try {
    const { attendanceId } = req.params;
    const updatedData = req.body;
    const attendance = await attendanceService.updateAttendance(
      attendanceId,
      updatedData,
    );
    res.status(200).json({ attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createAttendance,
  getAttendanceByDateAndCourse,
  getAttendanceByDateRange,
  updateAttendance,
};
