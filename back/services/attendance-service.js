const { Op } = require('sequelize');
const {
  User, Course, Attendance, Status,
} = require('../models');

class AttendanceService {
  async createAttendance(userId, courseId, statusId, date) {
    try {
      // Verificar si ya existe una asistencia con los mismos valores de userId, courseId y date
      const existingAttendance = await Attendance.findOne({
        where: {
          UserId: userId,
          CourseId: courseId,
          date: new Date(date).toISOString().slice(0, 10), // Normalizar a UTC
        },
      });

      // Si ya existe una asistencia, maneja la situación de acuerdo a tus necesidades
      if (existingAttendance) {
        // Puedes lanzar una excepción
        throw new Error(
          'La asistencia ya existe para este usuario.',
        );
        // O puedes devolver un mensaje de error o realizar cualquier otra acción
      }

      // Si no existe una asistencia, crea una nueva
      const attendance = await Attendance.create({
        UserId: userId,
        CourseId: courseId,
        StatusId: statusId,
        date: new Date(date).toISOString().slice(0, 10), // Normalizar a UTC
      });

      return attendance;
    } catch (error) {
      throw new Error(`Error de asistencia: ${error.message}`);
    }
  }

  async getAttendanceByDateRange(startDate, endDate) {
    try {
      const utcStartDate = new Date(`${startDate}T00:00:00.000Z`).toISOString();
      const utcEndDate = new Date(`${endDate}T23:59:59.999Z`).toISOString();
      const attendances = await Attendance.findAll({
        where: {
          date: {
            [Op.between]: [utcStartDate, utcEndDate],
          },
        },
        include: [
          {
            model: Course, // El modelo de estado
            as: 'course', // Alias para el estado
            attributes: ['title'], // Los campos que deseas recuperar del estado
          },
          {
            model: User, // El modelo  user
            as: 'user', // El alias que has definido en las asociaciones
            attributes: ['firstName', 'LastName'], // Los campos que deseas recuperar
          },
          {
            model: Status, // El modelo de estado
            as: 'status', // Alias para el estado
            attributes: ['name'], // Los campos que deseas recuperar del estado
          },
        ],
      });

      return attendances;
    } catch (error) {
      throw new Error(`Error fetching attendance: ${error.message}`);
    }
  }

  async getAttendanceByDateAndCourse(date, courseId) {
    try {
      // Normalizar la fecha a UTC
      const utcDate = new Date(date).toISOString().slice(0, 10);

      const attendance = await Attendance.findAll({
        where: {
          date: utcDate,
          CourseId: courseId,
        },
      });

      return attendance;
    } catch (error) {
      throw new Error(`Error fetching attendance: ${error.message}`);
    }
  }

  async updateAttendance(attendanceId, updatedData) {
    try {
      const attendance = await Attendance.findByPk(attendanceId);
      if (!attendance) {
        throw new Error('Attendance not found');
      }

      // Normalizar la fecha a UTC si es necesario antes de actualizar
      if (updatedData.date) {
        updatedData.date = new Date(updatedData.date)
          .toISOString()
          .slice(0, 10);
      }

      await attendance.update(updatedData);
      return attendance;
    } catch (error) {
      throw new Error(`Error updating attendance: ${error.message}`);
    }
  }
}

module.exports = AttendanceService;
