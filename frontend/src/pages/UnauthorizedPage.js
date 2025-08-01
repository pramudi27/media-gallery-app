import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => (
  <div style={{
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#c0392b"
  }}>
    <h1 style={{ fontSize: 60, margin: 0 }}>403</h1>
    <h2>Unauthorized</h2>
    <p>You do not have permission to access this page.</p>
    <Link to="/" style={{
      marginTop: 20,
      color: "#1e90ff",
      textDecoration: "underline",
      fontWeight: 500
    }}>
      &larr; Back to Home
    </Link>
  </div>
);

export default UnauthorizedPage;
