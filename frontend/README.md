# 🎨 Media Gallery Full Stack Web App

A modern full-featured media gallery built with **React (Bootstrap)**, **Node.js/Express**, **MongoDB**, and **Cloudinary**.  
Supports image uploads, gallery, user authentication (Email/OTP & Google), profile management, contact/feedback forms, and full admin functionality.

---

## 🚀 Features

- **User Authentication:** Email/password registration with OTP, Google OAuth login, forgot/reset password via OTP
- **Media Gallery:** Upload to Cloudinary, view/search/filter/edit/delete your images, image detail page, ZIP download
- **Contact/Feedback:** Submit, edit, delete your messages (admin sees all)
- **User Profile:** View & edit your profile
- **Admin:** Manage users, view all contact messages
- **UI:** Responsive, Bootstrap 5, fixed navbar

---

## 🏗️ Tech Stack

- **Frontend:** React, React Router, Bootstrap 5, Axios  
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)  
- **Image Hosting:** Cloudinary  
- **Auth:** JWT, Google OAuth, Email OTP (Nodemailer)  
- **Other:** Multer, Archiver (ZIP download)  

---

## ⚙️ Setup & Installation

```sh
# Clone repository
git clone https://github.com/pramudi27/media-gallery-app.git
cd media-gallery-app

# --- Backend ---
cd backend
npm install

# Create .env with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Start backend
npm start
# or
node server.js

# --- Frontend ---
cd ../frontend
npm install
npm start
# Frontend runs on http://localhost:3000

🤖 Note on AI Assistance

Parts of this project—including error fixing, UI suggestions, and troubleshooting were completed with the help of ChatGPT for guidance and code improvement.
No AI runs as part of the deployed app itself.