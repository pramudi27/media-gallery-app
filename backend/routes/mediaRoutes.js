const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const { protect } = require('../middlewares/auth');
const upload = require('../utils/upload'); // Multer config

// Upload media
router.post('/upload', protect, upload.single('image'), mediaController.uploadMedia);

// Get media (with search/filter)
router.get('/', protect, mediaController.getMedia);

// Edit/delete media
router.put('/:id', protect, mediaController.updateMedia);
router.delete('/:id', protect, mediaController.deleteMedia);

// Download ZIP of selected images
router.post('/download-zip', protect, mediaController.downloadZip);

module.exports = router;
