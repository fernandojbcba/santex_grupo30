const UserService = require('../services/user-service'); // Asegúrate de que la ruta sea correcta

async function loginController(req, res, next) {
  const userService = new UserService();

  try {
    // Obtengo datos de usuario y contraseña de req.body
    const { user, password } = req.body;

    // Llamo al método login de UserService
    const userResponse = await userService.login(user, password);

    // envío la respuesta JSON
    res.status(200).json({
      user: {
        id: userResponse.id,
        email: userResponse.email,
        name: userResponse.name,
      },
      accessToken: userResponse.accessToken,
    });
  } catch (error) {
    // Manejo de errores
    next(error);
  }
}

module.exports = { loginController };
