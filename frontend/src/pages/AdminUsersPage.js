import React from "react";
import AdminUserTable from "../components/Admin/AdminUserTable";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminUsersPage = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAdmin) return <Navigate to="/unauthorized" />;

  return (
    <div style={{ maxWidth: 800, margin: "30px auto" }}>
      <h2>Admin: Manage Users</h2>
      <AdminUserTable />
    </div>
  );
};

export default AdminUsersPage;
