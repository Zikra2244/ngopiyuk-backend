const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuth, isUser } = require('../middleware/is-auth'); 
const fileUpload = require('../middleware/file-upload');

// Rute untuk mendapatkan profil PENGGUNA YANG SEDANG LOGIN (hanya untuk role 'user')
router.get('/profile', isAuth, isUser, userController.getMyProfile);

// Rute untuk mengupdate profil (username, email)
router.put('/profile', isAuth, isUser, userController.updateProfile);

// Rute untuk mengupdate avatar
router.put('/profile/avatar', isAuth, isUser, fileUpload.single('avatar'), userController.updateAvatar);
router.post('/profile/favorites', isAuth, isUser, userController.addFavorite);
router.delete('/profile/favorites/:cafeId', isAuth, isUser, userController.removeFavorite);
router.get('/:userId', isAuth, userController.getUserById);

module.exports = router;