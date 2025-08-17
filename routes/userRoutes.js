const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuth = require('../middleware/is-auth');
const fileUpload = require('../middleware/file-upload');

// Rute untuk mendapatkan profil PENGGUNA YANG SEDANG LOGIN
// Method: GET, URL: /api/users/profile
router.get('/profile', isAuth, userController.getMyProfile);

// Rute untuk mengupdate profil (username, email)
// Method: PUT, URL: /api/users/profile
router.put('/profile', isAuth, userController.updateProfile);

// Rute untuk mengupdate avatar
// Method: PUT, URL: /api/users/avatar
router.put('/profile/avatar', isAuth, fileUpload.single('avatar'), userController.updateAvatar);
// Rute untuk mendapatkan profil PENGGUNA LAIN berdasarkan ID
// Method: GET, URL: /api/users/123
router.get('/:userId', userController.getUserById); // Asumsi Anda punya fungsi ini

module.exports = router;