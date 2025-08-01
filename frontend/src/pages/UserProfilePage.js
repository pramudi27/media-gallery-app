import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import { Navigate } from "react-router-dom";
import { Card, Form, Button, Alert, Spinner, Container } from "react-bootstrap";

const UserProfilePage = () => {
  const { isLoggedIn, loading, user, setUser } = useAuth();
  const [fields, setFields] = useState({ name: "", email: "" });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    api.get("/user/me").then(res => {
      setFields({ name: res.data.name, email: res.data.email });
    });
    // eslint-disable-next-line
  }, [isLoggedIn]);

  const handleEdit = async (e) => {
    e.preventDefault();
    setErr(""); setMsg(""); setSaving(true);
    try {
      await api.put("/user/me", fields);
      setMsg("Profile updated!");
      setUser({ ...user, ...fields });
      setEditMode(false);
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to update profile");
    }
    setSaving(false);
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <Spinner animation="border" />
    </div>
  );
  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <Container className="py-5" style={{ maxWidth: 500 }}>
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="fw-bold mb-4 text-center">User Profile</h2>
          {err && <Alert variant="danger">{err}</Alert>}
          {msg && <Alert variant="success">{msg}</Alert>}
          {editMode ? (
            <Form onSubmit={handleEdit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={fields.name}
                  required
                  onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={fields.email}
                  required
                  onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
                />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  type="button"
                  variant="outline-secondary"
                  className="me-2"
                  onClick={() => setEditMode(false)}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </Button>
              </div>
            </Form>
          ) : (
            <div>
              <div className="mb-3">
                <b>Name:</b> <span className="ms-1">{fields.name}</span>
              </div>
              <div className="mb-4">
                <b>Email:</b> <span className="ms-1">{fields.email}</span>
              </div>
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => setEditMode(true)}
                  variant="primary"
                  className="px-4"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfilePage;
