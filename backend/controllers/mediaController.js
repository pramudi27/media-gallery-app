const Media = require('../models/Media');
const cloudinary = require('../utils/cloudinary');
const archiver = require('archiver');
const fs = require('fs');

// Upload image
exports.uploadMedia = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);
    const media = new Media({
      userId: req.user._id,
      title,
      description,
      tags: tags.split(',').map(t => t.trim()),
      imageUrl: result.secure_url,
    });
    await media.save();
    fs.unlinkSync(req.file.path); // Clean up local file
    res.status(201).json(media);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get media (own + shared)
exports.getMedia = async (req, res) => {
  try {
    const query = { $or: [{ userId: req.user._id }, { shared: true }] };
    if (req.query.tag) query.tags = req.query.tag;
    if (req.query.title) query.title = { $regex: req.query.title, $options: 'i' };
    const media = await Media.find(query);
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit media
exports.updateMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media not found' });
    if (media.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    media.title = req.body.title || media.title;
    media.description = req.body.description || media.description;
    media.tags = req.body.tags ? req.body.tags.split(',').map(t => t.trim()) : media.tags;
    await media.save();
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete media
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media not found' });
    if (media.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await Media.findByIdAndDelete(req.params.id); // <--- CHANGED!
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err); // Always log the error!
    res.status(500).json({ message: err.message });
  }
};

// Download ZIP of selected images
exports.downloadZip = async (req, res) => {
  try {
    const { ids } = req.body; // Array of media IDs
    if (!Array.isArray(ids) || !ids.length) {
      return res.status(400).json({ message: 'No images selected.' });
    }
    const mediaFiles = await Media.find({ _id: { $in: ids }, userId: req.user._id });
    const archive = archiver('zip');
    res.attachment('media.zip');
    archive.pipe(res);

    let filesAdded = 0;

    for (let media of mediaFiles) {
      try {
        console.log('Fetching:', media.imageUrl);
        const response = await fetch(media.imageUrl);
        console.log('Status:', response.status, response.statusText);
        if (!response.ok) throw new Error(`Failed to fetch image (${response.status})`);

        // Convert to Buffer
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Determine file extension
        let fileExt = 'jpg';
        try {
          const match = media.imageUrl.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
          if (match) fileExt = match[1];
        } catch {}
        const fileName = `${media.title || 'image'}_${media._id}.${fileExt}`;

        archive.append(buffer, { name: fileName });
        filesAdded++;
      } catch (fetchErr) {
        console.error('Fetch error for', media.imageUrl, fetchErr);
      }
    }

    archive.finalize();

    archive.on('end', () => {
      console.log(`Archive finalized with ${filesAdded} files`);
    });

    // Optional: if no files were added, end the archive with a README
    archive.on('warning', err => {
      if (err.code === 'ENOENT') {
        // log warning
        console.warn('Archiver warning:', err);
      } else {
        throw err;
      }
    });
    archive.on('error', err => {
      throw err;
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
