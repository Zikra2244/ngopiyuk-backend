// ======================================================================
// PERBAIKAN #1: Tambahkan 'Cafe' ke dalam daftar impor
// ======================================================================
const { Review, User, Cafe } = require("../models");

/**
 * @desc    Mendapatkan semua review untuk satu kafe tertentu
 * @route   GET /api/cafes/:cafeId/reviews
 * @access  Public
 */
exports.getReviewsForCafe = async (req, res) => {
  try {
    const { cafeId } = req.params;

    // Opsional tapi direkomendasikan: Cek dulu apakah kafe-nya ada
    const cafeExists = await Cafe.findByPk(cafeId);
    if (!cafeExists) {
      return res.status(404).json({ message: "Kafe tidak ditemukan." });
    }

    const reviews = await Review.findAll({
      where: { cafeId }, // ====================================================================== // PERBAIKAN #2: Gunakan satu 'include' untuk menyertakan model User // ======================================================================
      include: [
        {
          model: User,
          attributes: ["username"], // Hanya ambil username dari penulis review
        },
      ],
      order: [["createdAt", "DESC"]], // Tampilkan review terbaru di atas
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("GET REVIEWS ERROR:", error);
    res.status(500).json({ message: "Gagal mengambil data review." });
  }
};

/**
 * @desc    Membuat review baru untuk satu kafe
 * @route   POST /api/cafes/:cafeId/reviews
 * @access  Private (Memerlukan login)
 */
exports.createReview = async (req, res) => {
  try {
    const { cafeId } = req.params;
    const { title, description, rating } = req.body;
    const userId = req.userData.userId;

    const newReviewData = {
      title,
      description,
      rating,
      cafeId: parseInt(cafeId, 10),
      userId,
    };

    if (req.file) {
      newReviewData.photoUrl = req.file.path.replace(/\\/g, "/");
    }

    await Review.create(newReviewData);

    const updatedReviews = await Review.findAll({
      where: { cafeId: cafeId },
      include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    });

    res.status(201).json(updatedReviews);
  } catch (error) {
    console.error("CREATE REVIEW ERROR:", error);
    res.status(500).json({ message: "Gagal membuat review." });
  }
};
