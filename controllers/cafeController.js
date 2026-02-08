const { Cafe, Review } = require("../models");
const { Sequelize } = require("sequelize");
const supabase = require("../config/supabase"); // Pastikan path ini benar
const path = require("path");

const getAllCafes = async (req, res) => {
  try {
    const cafes = await Cafe.findAll({
      attributes: {
        include: [
          // Gunakan "Review" (Tunggal) sesuai alias di models/index.js
          [Sequelize.fn("AVG", Sequelize.col("Review.rating")), "avgRating"],
          [Sequelize.fn("COUNT", Sequelize.col("Review.id")), "reviewCount"],
        ],
      },
      include: [
        {
          model: Review,
          as: "Review",
          attributes: ["id", "title", "description", "rating"],
          include: [
            {
              model: User,
              as: "User", // Pastikan alias ini ada di models/index.js
              attributes: ["username", "avatar"],
            },
          ],
        },
      ],
      group: ["Cafe.id"],
      order: [["createdAt", "DESC"]],
    });
    res.json(cafes);
  } catch (error) {
    console.error("Error Get All Cafes:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};
const createCafe = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(422).json({ message: "Foto kafe wajib di-upload." });
    }

    const { name, address, latitude, longitude } = req.body;
    const userId = req.userData.userId;

    // 1. Upload ke Supabase Storage
    const fileName = `cafe-${Date.now()}${path.extname(req.file.originalname)}`;
    const { data, error } = await supabase.storage
      .from("cafe-photos")
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true,
      });

    if (error) throw error;

    // 2. Dapatkan URL Publik
    const { data: publicUrlData } = supabase.storage
      .from("cafe-photos")
      .getPublicUrl(fileName);

    const newCafe = await Cafe.create({
      name,
      address,
      latitude,
      longitude,
      userId,
      photoUrl: publicUrlData.publicUrl, // Simpan Full URL
    });

    res.status(201).json(newCafe);
  } catch (error) {
    console.error("CREATE CAFE ERROR:", error);
    res.status(500).json({ message: "Gagal membuat kafe." });
  }
};

const updateCafe = async (req, res) => {
  try {
    const cafeId = parseInt(req.params.id, 10);
    const cafe = await Cafe.findByPk(cafeId);

    if (!cafe || cafe.userId !== req.userData.userId) {
      return res
        .status(403)
        .json({ message: "Akses ditolak atau kafe tidak ditemukan." });
    }

    const { name, address } = req.body;
    cafe.name = name;
    cafe.address = address;

    if (req.file) {
      const fileName = `cafe-${Date.now()}${path.extname(req.file.originalname)}`;
      const { error } = await supabase.storage
        .from("cafe-photos")
        .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("cafe-photos")
        .getPublicUrl(fileName);

      cafe.photoUrl = publicUrlData.publicUrl;
    }

    await cafe.save();
    res.status(200).json(cafe);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate kafe." });
  }
};

const deleteCafe = async (req, res) => {
  try {
    const cafe = await Cafe.findByPk(req.params.id);
    if (!cafe || cafe.userId !== req.userData.userId) {
      return res.status(403).json({ message: "Otorisasi ditolak." });
    }

    // Catatan: Jika ingin menghapus file di Supabase juga, Anda perlu mengekstrak nama file dari URL
    await cafe.destroy();
    res.status(200).json({ message: "Kafe berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus kafe." });
  }
};

module.exports = { getAllCafes, createCafe, updateCafe, deleteCafe };
