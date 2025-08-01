import React, { useEffect, useState } from "react";
import ImageUpload from "../components/Gallery/ImageUpload";
import GalleryList from "../components/Gallery/GalleryList";
import ZipDownloadPanel from "../components/Gallery/ZipDownloadPanel";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const MediaGalleryPage = () => {
  const { isLoggedIn, loading } = useAuth();
  const [media, setMedia] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchMedia = async () => {
      try {
        const res = await api.get("/media");
        setMedia(res.data);
      } catch {
        setMedia([]);
      }
    };
    fetchMedia();
  }, [isLoggedIn, reload]);

  if (loading) return <div>Loading...</div>;
  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <Container className="py-4" style={{ maxWidth: 1100 }}>
      <h2 className="fw-bold mb-4">My Media Gallery</h2>
      <ImageUpload onUploadSuccess={() => setReload(r => !r)} />
      <GalleryList />
      <ZipDownloadPanel mediaList={media} />
    </Container>
  );
};

export default MediaGalleryPage;
