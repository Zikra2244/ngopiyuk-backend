const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') return next();
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Autentikasi gagal!' });
  }
};