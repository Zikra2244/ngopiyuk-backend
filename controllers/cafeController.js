// backend/controllers/cafeController.js
const { Cafe } = require('../models'); // Impor model Cafe

// Fungsi untuk mengambil semua data kafe
const getAllCafes = async (req, res) => {
  console.log('========================================');
  console.log('TES: ENDPOINT /api/cafes BERHASIL DIPANGGIL!');
  console.log('========================================');
  try {
    const cafes = await Cafe.findAll(); // Mengambil semua baris dari tabel Cafes
    res.json(cafes);
  } catch (error) {
    console.error('Error mengambil data kafe:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const createCafe = async (req, res) => {
  try {
    // Ambil data dari body request yang dikirim frontend
    const { name, address, latitude, longitude } = req.body;

    // Buat entri baru di database menggunakan model Cafe
    const newCafe = await Cafe.create({
      name,
      address,
      latitude,
      longitude
    });

    // Kirim kembali data yang baru dibuat dengan status 201 (Created)
    res.status(201).json(newCafe);
  } catch (error) {
    console.error('Error membuat data kafe:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  getAllCafes,
  createCafe, // <-- Ekspor fungsi baru
};