import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const ImageDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin, loading, isLoggedIn } = useAuth();
  const [media, setMedia] = useState(null);
  const [err, setErr] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [fields, setFields] = useState({ title: "", description: "", tags: "" });

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await api.get("/media");
        const found = res.data.find((m) => m._id === id);
        if (found) {
          setMedia(found);
          setFields({
            title: found.title,
            description: found.description,
            tags: found.tags ? found.tags.join(",") : "",
          });
        } else {
          setErr("Image not found");
        }
      } catch {
        setErr("Failed to load image details.");
      }
    };
    fetchMedia();
    // eslint-disable-next-line
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await api.delete(`/media/${id}`);
      navigate("/gallery");
    } catch {
      alert("Delete failed.");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/media/${id}`, {
        title: fields.title,
        description: fields.description,
        tags: fields.tags,
      });
      setEditMode(false);
      setMedia((m) => ({
        ...m,
        ...fields,
        tags: fields.tags.split(",").map((t) => t.trim()),
      }));
    } catch {
      alert("Edit failed.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!isLoggedIn) return <div>Please <Link to="/login">login</Link> to view this image.</div>;
  if (err) return <div style={{ color: "red" }}>{err}</div>;
  if (!media) return <div>Loading image...</div>;

  const canEditOrDelete =
    user &&
    (media.userId === user.id || isAdmin);

  return (
    <div style={{ maxWidth: 700, margin: "30px auto" }}>
      <h2>Image Details</h2>
      <img
        src={media.imageUrl}
        alt={media.title}
        style={{
          maxWidth: "100%",
          border: "1px solid #ccc",
          marginBottom: 20,
        }}
      />
      {editMode ? (
        <form onSubmit={handleEdit}>
          <div>
            <input
              value={fields.title}
              required
              onChange={e => setFields(f => ({ ...f, title: e.target.value }))}
              placeholder="Title"
            />
          </div>
          <div>
            <textarea
              value={fields.description}
              onChange={e => setFields(f => ({ ...f, description: e.target.value }))}
              placeholder="Description"
            />
          </div>
          <div>
            <input
              value={fields.tags}
              onChange={e => setFields(f => ({ ...f, tags: e.target.value }))}
              placeholder="Tags (comma separated)"
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <div>
            <b>Title:</b> {media.title}
          </div>
          <div>
            <b>Description:</b> {media.description}
          </div>
          <div>
            <b>Tags:</b> {media.tags && media.tags.map((t, i) => (
              <span key={i} style={{ background: "#eee", margin: 2, padding: "2px 5px", borderRadius: 3 }}>#{t}</span>
            ))}
          </div>
          <div>
            <b>Uploaded at:</b> {media.createdAt ? new Date(media.createdAt).toLocaleString() : ""}
          </div>
          {canEditOrDelete && (
            <div style={{ marginTop: 20 }}>
              <button onClick={() => setEditMode(true)}>Edit</button>
              <button onClick={handleDelete} style={{ marginLeft: 10, color: "red" }}>Delete</button>
            </div>
          )}
        </>
      )}
      <div style={{ marginTop: 20 }}>
        <Link to="/gallery">&larr; Back to Gallery</Link>
      </div>
    </div>
  );
};

export default ImageDetailPage;
