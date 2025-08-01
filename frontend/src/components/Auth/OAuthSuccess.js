import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the token from the URL (query string)
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      // Optionally: trigger your auth context to re-fetch user
      // Redirect to dashboard/home
      navigate("/", { replace: true });
    } else {
      // No token found: show error or redirect
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return <div>Logging you in with Google...</div>;
};

export default OAuthSuccess;
