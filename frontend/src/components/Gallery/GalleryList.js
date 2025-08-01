import React, { useEffect, useState } from "react";
import api from "../../api/api";
import GalleryItem from "./GalleryItem";
import { Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";

const GalleryList = () => {
  const [media, setMedia] = useState([]);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedia();
    // eslint-disable-next-line
  }, []);

  const fetchMedia = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const params = {};
      if (search) params.title = search;
      if (tag) params.tag = tag;
      const res = await api.get("/media", { params });
      setMedia(res.data);
    } catch (err) {
      setMedia([]);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="mb-4">Media Gallery</h2>
      <Form onSubmit={fetchMedia} className="mb-4">
        <Row className="g-2 align-items-center">
          <Col xs={12} sm={5}>
            <Form.Control
              placeholder="Search title..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Col>
          <Col xs={12} sm={5}>
            <Form.Control
              placeholder="Search tag..."
              value={tag}
              onChange={e => setTag(e.target.value)}
            />
          </Col>
          <Col xs={12} sm={2}>
            <Button type="submit" className="w-100" variant="primary">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" />
        </div>
      ) : media.length === 0 ? (
        <Alert variant="info">No media found.</Alert>
      ) : (
        <Row className="g-3">
          {media.map(m => (
            <Col key={m._id} xs={12} sm={6} md={4} lg={3}>
              <GalleryItem media={m} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default GalleryList;
