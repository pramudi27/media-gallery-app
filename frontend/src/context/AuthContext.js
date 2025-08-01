import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {id, name, email, role}
  const [loading, setLoading] = useState(true);

  // Load user from token on first load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id, role: decoded.role });
        // Optionally, fetch user details from backend for name/email/profile
        api.get("/user/me").then(res => setUser({ ...decoded, ...res.data })).catch(() => {});
      } catch {
        setUser(null);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  // Login: save token and update user
  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser({ id: decoded.id, role: decoded.role });
    api.get("/user/me").then(res => setUser({ ...decoded, ...res.data })).catch(() => {});
  };

  // Logout: clear everything
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Check if logged in
  const isLoggedIn = !!user;

  // Check if admin
  const isAdmin = user && user.role === "admin";

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isLoggedIn, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
