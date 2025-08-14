// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Fungsi register Anda kemungkinan juga perlu disederhanakan
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    // Hashing sekarang otomatis dilakukan oleh hook di model
    const newUser = await User.create({
      username,
      email,
      password,
      role,
    });
    res.status(201).json({ message: 'User berhasil dibuat!', userId: newUser.id });
  } catch (error) {
    console.error('REGISTRATION ERROR:', error);
    res.status(500).json({ message: 'Gagal mendaftar', error: error.message });
  }
};

// --- PERUBAHAN UTAMA ADA DI FUNGSI LOGIN ---
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Kirim 401 Unauthorized agar lebih spesifik
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    // Gunakan method 'verifyPassword' dari model User
    const isPasswordCorrect = await user.verifyPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    // Jika password benar, buat dan kirim token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, username: user.username },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token });

  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ message: 'Gagal login', error: error.message });
  }
};