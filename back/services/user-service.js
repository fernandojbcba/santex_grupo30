const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { NotAuthorized } = require('../exceptions/not-authorized-exeptions');
const { NotFound } = require('../exceptions/not-found-exeptions');
const { User } = require('../models');

class UserService {
  async login(email, password) {
    const userRecord = await User.findOne({
      where: {
        email,
      },
      include: 'role',
    });

    if (!userRecord) {
      throw new NotFound('Usuario no encontrado');
    }

    const passwordMatches = await bcrypt.compare(password, userRecord.password);
    if (!passwordMatches) {
      throw new NotAuthorized('Contraseña incorrecta');
    }

    const secretKey = process.env.SECRET_KEY || 'ClaveUltraSecreta';
    const tokenClaims = {
      id: userRecord.id,
      user: userRecord.userName,
      role: userRecord.role.roleName,
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
}

module.exports = UserService;
