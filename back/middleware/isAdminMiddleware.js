function isAdmin(req, res, next) {
  const { user } = req; // Este usuario se agrega en el middleware authenticateToken

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado: No eres un administrador' });
  }

  // Si el usuario tiene el rol de administrador, permite el acceso
  return next();
}
module.exports = isAdmin;
