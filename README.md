# 🎨 Media Gallery Full Stack Web App

A modern, full-featured **Media Gallery** built with  
**React (Bootstrap) · Node.js/Express · MongoDB · Cloudinary**

<sup>Upload and manage images, authenticate with email or Google, manage your profile, send feedback, and enjoy a fully featured admin dashboard.</sup>

---

## 🚀 Features

- **User Authentication**
  - Email/password registration with OTP
  - Google OAuth login
  - Forgot/reset password via OTP
- **Media Gallery**
  - Upload images to Cloudinary
  - View, search, filter, edit, and delete your uploads
  - Image detail view
  - Download selected images as a ZIP archive
- **Contact/Feedback**
  - Submit, edit, and delete your own messages  
  - Admin: view all feedback/messages
- **User Profile**
  - View and edit your profile details
- **Admin**
  - Manage users (list, deactivate)
  - View all contact messages
- **UI/UX**
  - Responsive design (Bootstrap 5)
  - Fixed navbar, clean layouts, and smooth navigation

---

## 🏗️ Tech Stack

| Frontend  | Backend  | Image Hosting | Authentication | Other |
|-----------|----------|---------------|---------------|-------|
| React     | Node.js  | Cloudinary    | JWT           | Multer (uploads) |
| Bootstrap | Express  |               | Google OAuth  | Archiver (zip)   |
| Axios     | MongoDB  |               | Email OTP     |       |

---

## ⚙️ Setup & Installation

```sh
# 1. Clone repository
git clone https://github.com/pramudi27/media-gallery-app.git
cd media-gallery-app

# 2. Backend setup
cd backend
npm install

# Create .env file with the following content:
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

# Start the backend server
npm start
# or
node server.js

# 3. Frontend setup
cd ../frontend
npm install
npm start

# Visit the app at http://localhost:3000


🤖 Note on AI Assistance
Some parts of this project—including error fixing, UI ideas, and troubleshooting were completed with help from ChatGPT for guidance and code improvement.<br>
No AI runs as part of the deployed app itself.

<img width="1916" height="887" alt="Login" src="https://github.com/user-attachments/assets/c9941ff3-d042-4dd5-9593-58b27d071475" />
<img width="1907" height="805" alt="Register" src="https://github.com/user-attachments/assets/656eda5d-5b5c-45f2-9c7f-b388211eb168" />
<img width="1912" height="783" alt="OTP" src="https://github.com/user-attachments/assets/5269a797-b635-4954-8739-b04c1c149aba" />
<img width="1248" height="481" alt="Received OTP" src="https://github.com/user-attachments/assets/4b4652d3-f74a-4651-aa89-97a90705dd04" />
<img width="1915" height="887" alt="1" src="https://github.com/user-attachments/assets/9ea58b91-4cf9-480e-98f5-2f13266ca554" />
<img width="1881" height="577" alt="Gallery 1" src="https://github.com/user-attachments/assets/5e628c92-35ea-4bbd-8b08-86f6ce4197cf" />
<img width="1885" height="872" alt="Gallery 2" src="https://github.com/user-attachments/assets/230ce6b3-5aa0-44bd-acbf-21a12a9c6e72" />
<img width="1887" height="858" alt="My Messages" src="https://github.com/user-attachments/assets/29760d9a-e7a9-49e9-a212-18bd3907efaf" />
<img width="1898" height="646" alt="Profile" src="https://github.com/user-attachments/assets/0573fda7-287e-416d-87c9-57c91fce40b3" />
<img width="1902" height="703" alt="Admin Manage Messages" src="https://github.com/user-attachments/assets/bc0a44ab-e7fc-496d-8eb2-b4f03a36ca38" />
<img width="1912" height="775" alt="Admin Manage users" src="https://github.com/user-attachments/assets/7b9aa68a-7516-4333-af44-7155e8d57b71" />
<img width="1915" height="795" alt="MongoDB" src="https://github.com/user-attachments/assets/0b373a04-948c-4388-90a7-c58c96588aa3" />

