const AttendanceService = require('../services/attendance-service');

const attendanceService = new AttendanceService();

async function createAttendance(req, res) {
  try {
    const {
      userId, courseId, statusId, date,
    } = req.body;
    // verifico si la asistencia está duplicada
    const isDuplicate = await attendanceService.checkDuplicateAttendance(
      userId,
      courseId,
      date,
    );
    if (isDuplicate) {
      // si existe una asistencia para este usuario, curso y fecha
      return res.status(400).json({ message: 'La asistencia ya ha sido registrada para este usuario y curso en la misma fecha.' });
    }
    // si no existe la creo
    const attendance = await attendanceService.createAttendance(
      userId,
      courseId,
      statusId,
      date,
    );
    res.status(201).json({ message: 'Asistencia registrada con éxito', attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  return { message: 'No se pudo realizar la operación', error: 'Error desconocido' };
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

async function getPresentsByDateRange(req, res) {
  try {
    const { startDate, endDate } = req.query;
    const attendance = await attendanceService.getAttendanceByDateRangeWithStatus(
      startDate,
      endDate,
      1, // 1 para estado "Presente"
    );

    if (attendance.length === 0) {
      return res
        .status(404)
        .json({ message: 'No hay asistencias presentes para el rango de fechas especificado.' });
    }

    return res.status(200).json({ attendance });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function getAbsentAttendanceByDateRange(req, res) {
  try {
    const { startDate, endDate } = req.query;
    const attendance = await attendanceService.getAttendanceByDateRangeWithStatus(
      startDate,
      endDate,
      2, // 2 para estado "Ausente"
    );

    if (attendance.length === 0) {
      return res
        .status(404)
        .json({ message: 'No hay asistencias ausentes para el rango de fechas especificado.' });
    }

    return res.status(200).json({ attendance });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getLateAttendanceByDateRange(req, res) {
  try {
    const { startDate, endDate } = req.query;
    const attendance = await attendanceService.getAttendanceByDateRangeWithStatus(
      startDate,
      endDate,
      3, // 3 para estado "Llegada tarde"
    );

    if (attendance.length === 0) {
      return res
        .status(404)
        .json({ message: 'No hay asistencias con llegada tarde para el rango de fechas especificado.' });
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
  getPresentsByDateRange,
  getAbsentAttendanceByDateRange,
  getLateAttendanceByDateRange,
  getAttendanceByDateAndCourse,
  getAttendanceByDateRange,
  updateAttendance,
};
