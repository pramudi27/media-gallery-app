import React from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return <Navigate to="/" />;

  // Only render the form (no extra container or heading here!)
  return <RegisterForm />;
};

export default RegisterPage;
