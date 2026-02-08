console.log(">>> userController loaded <<<");

const { User, Review, Cafe } = require("../models");
const supabase = require("../config/supabase");
const path = require("path");

// Mengambil profil lengkap pengguna yang sedang login (dari token)
const getMyProfile = async (req, res) => {
  try {
    const userId = req.userData.userId; // Diambil dari middleware is-auth

    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "email", "avatar", "role"],
      include: [
        {
          model: Review,
          attributes: ["id", "title", "rating", "description", "createdAt"],
          include: [{ model: Cafe, attributes: ["id", "name"] }],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    // Format data agar mudah digunakan di frontend
    const profileData = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      reviewsCount: user.Reviews ? user.Reviews.length : 0,
      favoritesCount: 0, // Placeholder
      reviews: user.Reviews || [],
    };

    res.json(profileData);
  } catch (error) {
    console.error("Error mengambil profil:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Mengupdate profil (username/email) pengguna yang sedang login
const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.userData.userId;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    user.username = username;
    user.email = email;
    await user.save();

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Error mengupdate profil:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Mengupdate avatar pengguna yang sedang login
const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Tidak ada file yang di-upload" });
    }
    const userId = req.userData.userId;
    const user = await User.findByPk(userId);

    if (!user)
      return res.status(404).json({ message: "User tidak ditemukan." });

    const fileName = `avatar-${userId}-${Date.now()}${path.extname(req.file.originalname)}`;

    const { error } = await supabase.storage
      .from("cafe-photos")
      .upload(`avatars/${fileName}`, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("cafe-photos")
      .getPublicUrl(`avatars/${fileName}`);

    user.avatar = publicUrlData.publicUrl;
    await user.save();

    res.json({ avatar: user.avatar });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate avatar." });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId; // Ambil ID dari parameter URL

    const user = await User.findByPk(userId, {
      // Pilih hanya data publik yang ingin ditampilkan ke orang lain
      attributes: ["id", "username", "avatar"],
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    res.json(user);
  } catch (error) {
    console.error("Error mengambil profil by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMyProfile,
  updateProfile,
  updateAvatar,
  getUserById,
};
