import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div style={{
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#555"
  }}>
    <h1 style={{ fontSize: 70, margin: 0 }}>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you’re looking for does not exist or has been moved.</p>
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

export default NotFoundPage;
