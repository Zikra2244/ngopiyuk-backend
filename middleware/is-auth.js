const jwt = require("jsonwebtoken");
const { User } = require("../models"); // Impor model User

// Fungsi 1: Cek apakah user sudah login
const isAuth = async (req, res, next) => {
  if (req.method === "OPTIONS") return next();

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Autentikasi gagal!" });
    }
    const token = authHeader.split(" ")[1];

    // PASTIKAN: Di Vercel Env namanya adalah JWT_KEY
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findByPk(decodedToken.id);
    if (!user) throw new Error("User tidak ditemukan.");

    // Simpan di req.userData agar konsisten dengan controller yang sudah kita buat
    req.userData = {
      userId: user.id,
      role: user.role,
      username: user.username,
      email: user.email,
    };

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Sesi berakhir, silakan login kembali." });
  }
};

// Fungsi 2: Cek apakah role adalah 'user'
const isUser = (req, res, next) => {
  if (req.userData && req.userData.role === "user") {
    next(); // Lanjutkan jika peran adalah 'user'
  } else {
    res
      .status(403)
      .json({ message: "Akses ditolak. Rute ini hanya untuk user." });
  }
};

// FUNGSI BARU - Fungsi 3: Cek apakah role adalah 'admin'
const isAdmin = (req, res, next) => {
  if (req.userData && req.userData.role === "admin") {
    next(); // Lanjutkan jika peran adalah 'admin'
  } else {
    res
      .status(403)
      .json({ message: "Akses ditolak. Rute ini hanya untuk admin." });
  }
};

// Ekspor KETIGA fungsi sebagai objek
module.exports = { isAuth, isUser, isAdmin };
