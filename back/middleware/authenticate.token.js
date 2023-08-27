const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });
    // if (decodedToken.role === 'admin') {
    //   req.user = decodedToken;
    //   return next();
    // } if (decodedToken.id !== parseInt(req.params.userId, 10)) {
    //   return res.status(403).json({ error: 'Acceso no autorizado' });
    // }


    req.user = decodedToken;
    return next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}

module.exports = authenticateToken;
