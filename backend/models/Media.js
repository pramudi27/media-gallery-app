const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  tags: [{ type: String }],
  imageUrl: { type: String, required: true },
  shared: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Media', mediaSchema);
