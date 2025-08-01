const nodemailer = require('nodemailer');

// In-memory OTP store (for production, use Redis or DB)
const otps = {}; // { email: { otp, createdAt } }

function generateOTP(email) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps[email] = { otp, createdAt: Date.now() };

  // Setup nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"No Reply" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp} (valid for 10 minutes)`,
  };

  return transporter.sendMail(mailOptions);
}

function verifyOTP(email, otp) {
  const record = otps[email];
  if (!record) return false;

  const isExpired = Date.now() - record.createdAt > 10 * 60 * 1000; // 10 min
  if (isExpired) {
    delete otps[email];
    return false;
  }

  if (record.otp === otp) {
    delete otps[email]; // One-time use
    return true;
  }
  return false;
}

module.exports = { generateOTP, verifyOTP };
