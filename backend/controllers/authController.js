const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateOTP, verifyOTP } = require('../utils/otp');

// Register with Gmail OTP
exports.register = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;
    if (!verifyOTP(email, otp)) return res.status(400).json({ message: 'Invalid OTP' });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Send OTP to Gmail
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    await generateOTP(email);
    res.status(200).json({ message: 'OTP sent to email' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login (Manual)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isActive) return res.status(400).json({ message: 'Invalid credentials or user inactive' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Forgot Password (send OTP)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await generateOTP(email);
    res.status(200).json({ message: 'OTP sent to email' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reset Password (with OTP)
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!verifyOTP(email, otp)) return res.status(400).json({ message: 'Invalid OTP' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
