const { Review, User, Cafe } = require("../models");
const supabase = require("../config/supabase");
const path = require("path");

/**
 * @desc    Mendapatkan semua review untuk satu kafe tertentu
 * @route   GET /api/cafes/:cafeId/reviews
 * @access  Public
 */
exports.getReviewsForCafe = async (req, res) => {
  try {
    const { cafeId } = req.params;

    // Cek apakah kafe-nya ada
    const cafeExists = await Cafe.findByPk(cafeId);
    if (!cafeExists) {
      return res.status(404).json({ message: "Kafe tidak ditemukan." });
    }

    const reviews = await Review.findAll({
      where: { cafeId },
      include: [
        {
          model: User,
          as: "User", // WAJIB: Harus sama dengan alias di models/index.js
          attributes: ["username", "avatar"], // Ambil info penulis review
        },
      ],
      order: [["createdAt", "DESC"]], // Review terbaru di atas
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("GET REVIEWS ERROR:", error);
    res.status(500).json({ message: "Gagal mengambil data review." });
  }
};

/**
 * @desc    Membuat review baru untuk satu kafe
 * @route   POST /api/cafes/:cafeId/reviews
 * @access  Private (Memerlukan login)
 */
exports.createReview = async (req, res) => {
  try {
    const { cafeId } = req.params;
    const { title, description, rating } = req.body;
    const userId = req.userData.userId; // Dari middleware is-auth

    const newReviewData = {
      title,
      description,
      rating: parseInt(rating, 10),
      cafeId: parseInt(cafeId, 10),
      userId,
    };

    // Logika Upload Foto ke Supabase (Jika ada)
    if (req.file) {
      const fileName = `review-${Date.now()}${path.extname(req.file.originalname)}`;
      const { error: uploadError } = await supabase.storage
        .from("cafe-photos")
        .upload(`reviews/${fileName}`, req.file.buffer, {
          contentType: req.file.mimetype,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("cafe-photos")
        .getPublicUrl(`reviews/${fileName}`);

      newReviewData.photoUrl = publicUrlData.publicUrl;
    }

    // Simpan Review Baru
    await Review.create(newReviewData);

    // Ambil ulang daftar review terbaru agar frontend langsung update
    const updatedReviews = await Review.findAll({
      where: { cafeId: cafeId },
      include: [
        {
          model: User,
          as: "User", // Tetap sertakan alias di sini
          attributes: ["username", "avatar"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(201).json(updatedReviews);
  } catch (error) {
    console.error("CREATE REVIEW ERROR:", error);
    res.status(500).json({ message: "Gagal membuat review." });
  }
};
