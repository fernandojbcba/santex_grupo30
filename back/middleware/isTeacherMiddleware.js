function isTeacher(req, res, next) {
  const { user } = req; // Este usuario se agrega en el middleware authenticateToken

  if (!user || user.role !== 'teacher') {
    return res.status(403).json({ error: 'Acceso denegado: No eres un profesor' });
  }

  // Si el usuario tiene el rol de teacher, permite el acceso
  return next();
}
module.exports = isTeacher;
