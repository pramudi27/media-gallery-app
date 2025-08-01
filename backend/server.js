require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('./passport'); // Make sure this is correct path
const authRoutes = require('./routes/authRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Initialize passport (for Google OAuth)
app.use(passport.initialize());

// Main routes
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/user', userRoutes);

// Serve Multer uploads temp files if needed (for debugging only, remove in production)
app.use('/uploads', express.static('uploads'));

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'API route not found' });
});

// Global error handler (Optional, can be improved)
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });