const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { NotAuthorized } = require('../exceptions/not-authorized-exeptions');
const { NotFound } = require('../exceptions/not-found-exeptions');
const { User, Role } = require('../models');

class UserService {
  async createUser(firstName, lastName, userName, password, email, roleName) {
    const role = await Role.findOne({ where: { roleName } });

    if (!role) {
      throw new Error('Role not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
      email,
      RoleId: role.id,
    });

    return user;
  }

  async getUserByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async getAllUsers() {
    return User.findAll({
      include: 'role',
      attributes: { exclude: ['password'] },
    });
  }

  async updateUser(userId, updatedFields) {
    const existingUser = await User.findByPk(userId);

    if (!existingUser) {
      throw new NotFound('User not found');
    }

    Object.assign(existingUser, updatedFields);
    await existingUser.save();

    return User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });
  }

  async deleteUser(userId) {
    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      throw new NotFound('User not found');
    }

    await existingUser.destroy();
  }

  async hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async getUserById(userId) {
    const user = await User.findByPk(userId, {
      attributes: ['firstName', 'lastName', 'userName', 'email'],
    });
    return user;
  }

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

    const secretKey = process.env.SECRET_KEY;
    const tokenClaims = {
      id: userRecord.id,
      user: userRecord.userName,
      role: userRecord.role.roleName,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
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

  async getUserByToken(token) {
    const secretKey = process.env.SECRET_KEY;
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.id;
    const UserProfile = await User.findByPk(userId, {
      attributes: ['firstName', 'lastName', 'userName', 'email'],
    });
    return UserProfile;
  }
}

module.exports = UserService;
