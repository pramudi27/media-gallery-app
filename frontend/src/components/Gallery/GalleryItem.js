import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";

const GalleryItem = ({ media }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="gallery-card mb-4 shadow-sm border-0"
      style={{ cursor: "pointer", width: 230 }}
      onClick={() => navigate(`/media/${media._id}`)}
    >
      <Card.Img
        variant="top"
        src={media.imageUrl}
        alt={media.title}
        style={{ height: 140, objectFit: "cover" }}
      />
      <Card.Body className="p-2">
        <div className="fw-semibold mb-1" style={{ fontSize: 17 }}>
          {media.title}
        </div>
        <div className="text-muted" style={{ fontSize: 14, minHeight: 36 }}>
          {media.description}
        </div>
        <div className="mt-2">
          {media.tags &&
            media.tags.map((tag, idx) => (
              <Badge
                key={idx}
                pill
                bg="light"
                text="dark"
                className="me-1 mb-1 border"
                style={{ fontWeight: 400, fontSize: 11 }}
              >
                #{tag}
              </Badge>
            ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default GalleryItem;
