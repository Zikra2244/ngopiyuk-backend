const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Middleware khusus admin
router.use(authMiddleware, adminMiddleware);

// Get all users (hanya admin)
router.get('/users', adminController.getAllUsers);

// Delete user (hanya admin)
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;