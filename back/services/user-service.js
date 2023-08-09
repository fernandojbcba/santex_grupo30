const jwt = require('jsonwebtoken');
const { NotAuthorized } = require('../exceptions/not-authorized-exeptions');
const { NotFound } = require('../exceptions/not-found-exeptions');
const { User } = require('../models/user');

async function login(user, password) {
  const userRecord = await User.findOne({
    where: {
      userName: user,
    },
  });

  if (!userRecord) {
    throw new NotFound('Usuario no encontrado');
  }

  // Validar la contraseña
  if (userRecord.password !== password) {
    throw new NotAuthorized('Contraseña incorrecta');
  }

  // Generar el token de acceso
  const secretKey = 'ClaveUltraSecreta';
  const tokenClaims = {
    id: userRecord.id,
    email: userRecord.email,
    name: userRecord.name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  };

  const accessToken = jwt.sign(tokenClaims, secretKey);

  const userToSend = {
    id: userRecord.id,
    email: userRecord.email,
    name: userRecord.name,
    accessToken,
  };

  return userToSend;
}

async function getEnrolledCourses(userId) {
  const userRecord = await User.findByPk(userId);
  const enrolledCourses = await userRecord.getCourses();

  const coursesToSend = enrolledCourses.map((course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
  }));

  return coursesToSend;
}

module.exports = { login, getEnrolledCourses };
