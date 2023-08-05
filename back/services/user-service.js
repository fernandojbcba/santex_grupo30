const { NotAuthorized, NotFound } = require('../exceptions/user-exceptions')
const { User } = require('../models/user')
const jwt = require('jsonwebtoken')

async function login(user, password) {
  const userRecord = await User.findOne({
    where: {
      userName: user, 
    }
  })

  if (!userRecord) {
    throw new NotFound("Usuario no encontrado")
  }

  // Validar la contraseña
  if (userRecord.password !== password) { 
    throw new NotAuthorized("Contraseña incorrecta")
  }

  // Generar el token de acceso 
  const secretKey = 'ClaveUltraSecreta' // asi estaba en la muestra que hicimos en la clase, no sabia que poner ja
  const tokenClaims = {
    id: userRecord.id,
    email: userRecord.email,
    name: userRecord.name,
    iat: Math.floor(Date.now() / 1000), // Fecha de emisión del token
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // Fecha de vencimiento del token en una hora desde la emisión (1 hora de duración)
  }

  const accessToken = jwt.sign(tokenClaims, secretKey)

  // Datos para enviar al frontend (sin contraseña)
  const userToSend = {
    id: userRecord.id,
    email: userRecord.email,
    name: userRecord.name,
    accessToken: accessToken
  }

  return userToSend
}

module.exports = { login }

