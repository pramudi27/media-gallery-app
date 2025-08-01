import React, { useState } from "react";
import { Form, Button, Card, Alert, Container, Spinner } from "react-bootstrap";
import OTPForm from "./OTPForm";
import api from "../../api/api";

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setErr(""); setMsg(""); setLoading(true);
    try {
      await api.post("/auth/send-otp", { email: fields.email });
      setStep(2);
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to send OTP");
    }
    setLoading(false);
  };

  const handleRegister = async (otp) => {
    setErr(""); setMsg(""); setLoading(true);
    try {
      await api.post("/auth/register", { ...fields, otp });
      setMsg("Registration successful! You can now log in.");
      setStep(3);
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <Card className="shadow-lg p-4 border-0" style={{ width: 400, maxWidth: "100%" }}>
        <Card.Body>
          <h2 className="mb-4 text-center fw-bold">Register for Media Gallery</h2>
          {err && <Alert variant="danger">{err}</Alert>}
          {msg && <Alert variant="success">{msg}</Alert>}

          {step === 1 && (
            <Form onSubmit={handleSendOTP} autoComplete="off">
              <Form.Group className="mb-3" controlId="registerName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={fields.name}
                  onChange={e => setFields({ ...fields, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={fields.email}
                  onChange={e => setFields({ ...fields, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="registerPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={fields.password}
                  onChange={e => setFields({ ...fields, password: e.target.value })}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading}
                style={{ fontWeight: "bold", fontSize: "1.1rem" }}
              >
                {loading ? <><Spinner animation="border" size="sm" /> Sending OTP...</> : "Send OTP"}
              </Button>
            </Form>
          )}

          {step === 2 && (
            <OTPForm email={fields.email} onVerify={handleRegister} loading={loading} />
          )}

          {step === 3 && (
            <div className="text-center">
              <p>Registration complete. Please <a href="/login">login</a>.</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterForm;
