const UserService = require('../services/user-service');

async function loginController(req, res, next) {
  const userService = new UserService();

  try {
    const { email, password } = req.body;

    const userResponse = await userService.login(email, password);

    res.status(200).json({
      user: {
        id: userResponse.id,
        email: userResponse.email,
        name: userResponse.name,
      },
      token: userResponse.accessToken,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { loginController };
