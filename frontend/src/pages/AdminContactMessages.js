import React from "react";
import AdminMessagesTable from "../components/Admin/AdminMessagesTable";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminContactMessages = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAdmin) return <Navigate to="/unauthorized" />;

  return <AdminMessagesTable />;
};

export default AdminContactMessages;
