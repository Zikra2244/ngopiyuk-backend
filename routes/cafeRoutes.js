// backend/routes/cafeRoutes.js
const express = require('express');
const router = express.Router();
// Impor kedua fungsi dari controller
const { getAllCafes, createCafe } = require('../controllers/cafeController');

// Rute GET yang sudah ada
router.get('/', getAllCafes);

// Rute POST baru untuk membuat kafe
router.post('/', createCafe); // <-- TAMBAHKAN BARIS INI

module.exports = router;