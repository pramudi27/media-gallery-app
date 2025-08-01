import React, { useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import api from "../../api/api";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      if (onLoginSuccess) onLoginSuccess();
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${api.defaults.baseURL.replace('/api', '')}/api/auth/google`;
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <Card className="shadow-lg p-4 border-0" style={{ width: 370, maxWidth: "100%" }}>
        <Card.Body>
          <h2 className="mb-4 text-center fw-bold">Login to Media Gallery</h2>
          {err && <Alert variant="danger">{err}</Alert>}
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-2"
              disabled={loading}
              style={{ fontWeight: "bold", fontSize: "1.1rem" }}
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
            <Button
              variant="outline-danger"
              type="button"
              onClick={handleGoogleLogin}
              className="w-100"
              disabled={loading}
              style={{ fontWeight: "bold", fontSize: "1.1rem" }}
            >
              <FaGoogle className="me-2 mb-1" />
              Sign in with Google
            </Button>
          </Form>
          {/* Add your navigation links below the form */}
          <div className="mt-3 text-center" style={{ fontSize: 14 }}>
            <a href="/register">Don't have an account? Register</a>
            <br />
            <a href="/forgot-password">Forgot password?</a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginForm;
