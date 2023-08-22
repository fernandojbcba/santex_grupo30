const UserService = require('../services/user-service');

async function viewProfile(req, res) {
  const viewuser = new UserService();
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No Autorizado' });
  }

  const token = authHeader.substring(7);
  console.log(token);
  try {
    const user = await viewuser.getUserByToken(token);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'error' });
  }
}

module.exports = {
  viewProfile,
};
