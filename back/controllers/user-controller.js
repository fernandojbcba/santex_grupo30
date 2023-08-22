const UserService = require('../services/user-service');
const { Role } = require('../models');

const userService = new UserService();

const createUser = async (req, res) => {
  try {
    const {
      firstName, lastName, userName, password, email,
    } = req.body;

    // Verifica si el correo electrónico ya está en uso
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Busca el rol "user" por defecto en la base de datos
    const role = await Role.findOne({ where: { roleName: 'user' } });

    if (!role) {
      return res.status(404).json({ message: 'Default role "user" not found' });
    }

    // Hashea el password antes de guardarlo
    const hashedPassword = await userService.hashPassword(password);

    // Crea el usuario con el rol "user" por defecto
    const user = await userService.createUser(
      firstName,
      lastName,
      userName,
      hashedPassword,
      email,
      role.roleName, // Asigna el ID del rol "user" al campo RoleId
    );

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user' });
  }
};
// Actualizar un usuario por su ID
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      firstName, lastName, userName, password, email, roleId,
    } = req.body;

    // Verifica si el usuario existe
    const existingUser = await userService.getUserById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hashea el password antes de guardarlo
    const hashedPassword = await userService.hashPassword(password);

    // Actualiza el usuario
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

// Eliminar un usuario por su ID
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verifica si el usuario existe en la base de datos
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Si el usuario existe, procede a eliminarlo
    await userService.deleteUser(userId);

    return res.status(204).json(); // 204 No Content (indicando éxito sin contenido)
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user' });
  }
};

module.exports = { createUser, updateUser, deleteUser };
