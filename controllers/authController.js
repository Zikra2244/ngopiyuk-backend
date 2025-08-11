// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
  // Ambil username dari request body
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    // Simpan username ke database
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: 'User berhasil dibuat!', userId: newUser.id });
  } catch (error) {
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

    // Sertakan username di dalam token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, username: user.username },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token }); // Cukup kirim token
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ message: 'Gagal login', error: error.message });
  }
};