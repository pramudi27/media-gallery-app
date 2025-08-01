const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, adminOnly } = require('../middlewares/auth');

// Admin: view all users, edit profile, deactivate
router.get('/admin/all', protect, adminOnly, userController.getUsers);
router.put('/admin/:id', protect, adminOnly, userController.updateUser);
router.put('/admin/deactivate/:id', protect, adminOnly, userController.deactivateUser);

// User: view/update own profile
router.get('/me', protect, userController.getProfile);
router.put('/me', protect, userController.updateProfile);

module.exports = router;
