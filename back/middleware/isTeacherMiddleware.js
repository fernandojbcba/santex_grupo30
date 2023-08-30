function isTeacher(req, res, next) {
  const { user } = req; // Este usuario se agrega en el middleware authenticateToken

  if (!user || (user.role !== 'teacher' && user.role !== 'admin')) {
    return res.status(403).json({ error: 'Acceso denegado: debes ser profesor o admin' });
  }

  // Rol teacher o admin, permite el acceso
  return next();
}
module.exports = isTeacher;
