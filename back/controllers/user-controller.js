const UserService = require('../services/user-service');
const { Role } = require('../models');

const userService = new UserService();

const createUser = async (req, res) => {
  try {
    const {
      firstName, lastName, userName, password, email,
    } = req.body;

    // Verifico si el email ya está en uso
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Busco el rol "user" por defecto en la base de datos
    const role = await Role.findOne({ where: { roleName: 'user' } });

    if (!role) {
      return res.status(404).json({ message: 'Default role "user" not found' });
    }

    // Crea el usuario con el rol "user" por defecto
    const user = await userService.createUser(
      firstName,
      lastName,
      userName,
      password,
      email,
      role.roleName, // Asigno user por defecto
    );

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user' });
  }
};
// Actualizo el usuario por ID
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      firstName, lastName, userName, password, email, roleId,
    } = req.body;

    // Verifico si el usuario existe
    const existingUser = await userService.getUserById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hasheo el password antes de guardarlo
    const hashedPassword = await userService.hashPassword(password);

    // Actualizo el usuario
    const updatedUser = await userService.updateUser(userId, {
      firstName,
      lastName,
      userName,
      password: hashedPassword,
      email,
      roleId,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user' });
  }
};

// Elimino un usuario por ID
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verifico si user existe en la base
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Si el usuario existe, lo elimino
    await userService.deleteUser(userId);

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user' });
  }
};

module.exports = { createUser, updateUser, deleteUser };