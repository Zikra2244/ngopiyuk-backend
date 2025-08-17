const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuth = require('../middleware/is-auth');
const fileUpload = require('../middleware/file-upload');

// Rute untuk mendapatkan profil PENGGUNA YANG SEDANG LOGIN
// Method: GET, URL: /api/users/profile
router.get('/profile', isAuth, userController.getMyProfile);

// Rute untuk mengupdate profil PENGGUNA YANG SEDANG LOGIN (username, email)
// Method: PUT, URL: /api/users/profile
router.put('/profile', isAuth, userController.updateProfile);

// Rute untuk mengupdate avatar PENGGUNA YANG SEDANG LOGIN
// Method: PUT, URL: /api/users/profile/avatar
router.put('/profile/avatar', isAuth, fileUpload.single('avatar'), userController.updateAvatar);

module.exports = router;