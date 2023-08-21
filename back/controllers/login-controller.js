const UserService = require('../services/user-service'); // Asegúrate de que la ruta sea correcta

async function loginController(req, res, next) {
  const userService = new UserService();

  try {
    // Obtengo datos de usuario y contraseña de req.body
    const { email, password } = req.body;

    // Llamo al método login de UserService
    const userResponse = await userService.login(email, password);

    // envío la respuesta JSON
    res.status(200).json({
      user: {
        id: userResponse.id,
        email: userResponse.email,
        name: userResponse.name,
      },
      token: userResponse.accessToken,
    });
  } catch (error) {
    // Manejo de errores
    next(error);
  }
}

async function createUser(req, res, next) {
  const registro = new UserService();
  try {
    const userData = { ...req.body, RoleId: 2 };
    await registro.CreateUser(userData);
    res.status(201).json('Usuario Registrado');
  } catch (error) {
    next(error);
  }
}

module.exports = { loginController, createUser };
