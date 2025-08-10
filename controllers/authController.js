// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: 'User berhasil dibuat!', userId: newUser.id });
  } catch (error) {
    // TAMBAHKAN BARIS INI UNTUK MELIHAT ERROR DI TERMINAL
    console.error('REGISTRATION ERROR:', error);
    res.status(500).json({ message: 'Gagal mendaftar', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan!' });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Password salah!' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      'kunci_rahasia_super_aman_jangan_ditiru',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token, userId: user.id, role: user.role });
  } catch (error) {
    // TAMBAHKAN JUGA DI SINI
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ message: 'Gagal login', error: error.message });
  }
};