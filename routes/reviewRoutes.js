// backend/routes/reviewRoutes.js
const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController');
const isAuth = require('../middleware/is-auth');
const fileUpload = require('../middleware/file-upload'); // Pastikan ini diimpor

// Terapkan semua middleware secara berurutan
router.post('/', isAuth, fileUpload.single('photo'), reviewController.createReview);

router.get('/', reviewController.getReviewsForCafe);

module.exports = router;