const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/multerConfig.js');

// Get user profile (hanya untuk user biasa)
router.get('/:id', userController.getUserProfile);

// Update profile (hanya untuk user yang login)
router.put('/', authMiddleware, userController.updateProfile);

// Update avatar (hanya untuk user yang login)
router.post('/avatar', authMiddleware, upload.single('avatar'), userController.updateAvatar);

// Endpoint untuk mendapatkan profil user yang login
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;