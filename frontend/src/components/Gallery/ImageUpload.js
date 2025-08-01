import React, { useState } from "react";
import api from "../../api/api";
import { Form, Button, Card, Alert } from "react-bootstrap";

const ImageUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [preview, setPreview] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      if (!file) throw new Error("Please select a file");
      const data = new FormData();
      data.append("image", file);
      data.append("title", title);
      data.append("description", description);
      data.append("tags", tags);
      await api.post("/media/upload", data, { headers: { "Content-Type": "multipart/form-data" } });
      setTitle(""); setDescription(""); setTags(""); setFile(null); setPreview(null);
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      setErr(error.response?.data?.message || "Upload failed");
    }
    setLoading(false);
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <h4 className="mb-3">Upload Image</h4>
        {err && <Alert variant="danger">{err}</Alert>}
        <Form onSubmit={handleUpload}>
          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFile}
              required
            />
          </Form.Group>
          {preview && <img src={preview} alt="preview" width={120} className="mb-3 rounded" />}
          <Form.Group className="mb-2">
            <Form.Control
              placeholder="Title"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={e => setTags(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="w-100" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ImageUpload;
