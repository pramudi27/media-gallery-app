import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import api from "../../api/api";

const ContactForm = ({ onSubmitSuccess, initial }) => {
  const [name, setName] = useState(initial?.name || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [message, setMessage] = useState(initial?.message || "");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setMsg("");
    try {
      if (initial && initial._id) {
        await api.put(`/contact/${initial._id}`, { message });
        setMsg("Message updated!");
      } else {
        await api.post("/contact", { name, email, message });
        setMsg("Message sent!");
        setName(""); setEmail(""); setMessage("");
      }
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to send");
    }
  };

  return (
    <Card className="shadow-sm p-3 border-0 mb-3">
      <Card.Body>
        <h4 className="mb-3">{initial ? "Edit Message" : "Contact Us"}</h4>
        {err && <Alert variant="danger">{err}</Alert>}
        {msg && <Alert variant="success">{msg}</Alert>}
        <Form onSubmit={handleSubmit} autoComplete="off">
          {!initial && (
            <>
              <Form.Group className="mb-3" controlId="contactName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="contactEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>
            </>
          )}
          <Form.Group className="mb-3" controlId="contactMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              required
              placeholder="Type your message"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100 fw-bold">
            {initial ? "Update" : "Send"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ContactForm;
