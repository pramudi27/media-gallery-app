import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, isAdmin, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "#1e90ff",
        color: "#fff",
        padding: "12px 30px",
        height: "56px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000
      }}
    >
      <div>
        <Link
          to="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "1px"
          }}
        >
          Media Gallery
        </Link>
      </div>
      <div style={{ display: "flex", gap: "22px", alignItems: "center" }}>
        <Link to="/" style={linkStyle}>Dashboard</Link>
        <Link to="/gallery" style={linkStyle}>Gallery</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
        {isAdmin && (
          <>
            <Link to="/admin/users" style={linkStyle}>Admin Users</Link>
            <Link to="/admin/messages" style={linkStyle}>Admin Messages</Link>
          </>
        )}
        {isLoggedIn && <Link to="/profile" style={linkStyle}>Profile</Link>}
        {!isLoggedIn && (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: 16,
              marginLeft: 8,
              padding: "2px 10px"
            }}
          >
            Logout{user?.name ? ` (${user.name})` : ""}
          </button>
        )}
      </div>
    </nav>
  );
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: 16,
  transition: "color 0.2s",
};

export default Navbar;
