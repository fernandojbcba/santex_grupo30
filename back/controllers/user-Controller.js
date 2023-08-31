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

    const role = await Role.findOne({ where: { roleName: 'user' } });

    if (!role) {
      return res.status(404).json({ message: 'Default role "user" not found' });
    }

    // Crea el usuario con el rol "user" por defecto
    await userService.createUser(
      firstName,
      lastName,
      userName,
      password,
      email,
      role.roleName, // Asigno user por defecto
    );
    return res.status(201).json({ message: 'create user ok' });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    // Crear una nueva lista de usuarios con el campo "RoleName" en lugar de "RoleId"
    const usersWithRoleName = users.map((user) => {
      // quito role anidado, roleID y pass del listado al desestructurar alobjeto user
      const {
        password, role, RoleId, ...userWithoutPassword
      } = user.toJSON();
      const { roleName } = user.role;

      // Creo un nuevo objeto con los cambios y agrego roleName
      return { ...userWithoutPassword, roleName };
    });
    // envìo la lista como respuesta
    return res.status(200).json(usersWithRoleName);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving users' });
  }
};

const getTeacherUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    // Filtrar solo los usuarios con roleName "teacher"
    const teacherUsers = users.filter((user) => user.role.roleName === 'teacher');

    return res.status(200).json(teacherUsers);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving users' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      firstName, lastName, userName, password, email, RoleId,
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
      RoleId,
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
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Si el usuario existe, lo elimino
    await userService.deleteUser(userId);

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user' });
  }
};

const viewProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'error' });
  }
};

module.exports = {
  createUser, updateUser, deleteUser, viewProfile, getAllUsers, getTeacherUsers,
};
