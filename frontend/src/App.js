import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import OAuthSuccess from "./components/Auth/OAuthSuccess";

import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordForm from "./components/Auth/ForgotPasswordForm";
import MediaGalleryPage from "./pages/MediaGalleryPage";
import ImageDetailPage from "./pages/ImageDetailPage";
import UserProfilePage from "./pages/UserProfilePage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminContactMessages from "./pages/AdminContactMessages";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      {/* main-content ensures a gap below fixed navbar */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/gallery" element={<MediaGalleryPage />} />
          <Route path="/media/:id" element={<ImageDetailPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/messages" element={<AdminContactMessages />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
