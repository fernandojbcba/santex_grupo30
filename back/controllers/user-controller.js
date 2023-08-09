const userService = require('../services/user-service');

async function login(req, res, next) {
  const { user, password } = req.body;

  try {
    const userResponse = await userService.login(user, password);

    res.status(200).json({
      user: {
        id: userResponse.id,
        email: userResponse.email,
        name: userResponse.name,
      },
      accessToken: userResponse.accessToken,
    });
  } catch (error) {
    next(error);
  }
}

async function sendEnrolledCourses(req, res, next) {
  try {
    const userId = req.user.id;
    const enrolledCourses = await userService.getEnrolledCourses(userId);

    res.status(200).json(enrolledCourses);
  } catch (error) {
    next(error);
  }
}

module.exports = { login, sendEnrolledCourses };
