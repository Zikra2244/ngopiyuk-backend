const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Impor model User

module.exports = async (req, res, next) => {
  // Izinkan request OPTIONS untuk lewat
  if (req.method === 'OPTIONS') {
    return next();
  }
  
  try {
    // 1. Dapatkan token dari header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Autentikasi gagal! Header tidak ditemukan.');
    }
    const token = authHeader.split(' ')[1];

    // 2. Verifikasi token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    // 3. Cari user di database untuk memastikan user masih ada
    const user = await User.findByPk(decodedToken.id);
    if (!user) {
      throw new Error('User tidak ditemukan.');
    }

    // 4. Attach ID user ke request sebagai 'req.userData' agar konsisten
    req.userData = { userId: user.id };

    next();
  } catch (err) {
    console.error("ERROR DI is-auth:", err.message);
    return res.status(401).json({ message: 'Autentikasi gagal!' });
  }
};