const express = require('express');
const router = express.Router();
const { getAllCafes, createCafe, updateCafe, deleteCafe } = require('../controllers/cafeController');
const isAuth = require('../middleware/is-auth');
const reviewRoutes = require('./reviewRoutes'); // Impor rute review
const fileUpload = require('../middleware/file-upload');

router.get('/', getAllCafes);

router.post('/', isAuth, createCafe);
router.post('/', isAuth, fileUpload.single('photo'), createCafe);
// RUTE SPESIFIK BERDASARKAN ID KAFE
// Rute ini harus didefinisikan sebelum rute review yang lebih umum
router.put('/:id', isAuth, fileUpload.single('photo'), updateCafe);
router.delete('/:id', isAuth, deleteCafe);

// NESTED ROUTE UNTUK REVIEW
// Semua request ke /api/cafes/:cafeId/reviews akan ditangani oleh reviewRoutes
router.use('/:cafeId/reviews', reviewRoutes);

module.exports = router;