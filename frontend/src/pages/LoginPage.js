import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return <Navigate to="/" />;

  return <LoginForm onLoginSuccess={() => window.location = "/"} />;
};

export default LoginPage;
