import React, { useState } from "react";
import api from "../../api/api";
import { Button, Card } from "react-bootstrap";

const ZipDownloadPanel = ({ mediaList }) => {
  const [selected, setSelected] = useState([]);
  const [downloading, setDownloading] = useState(false);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const downloadZip = async () => {
    if (!selected.length) return;
    setDownloading(true);
    try {
      const res = await api.post("/media/download-zip", { ids: selected }, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "media.zip");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch {
      alert("Failed to download ZIP.");
    }
    setDownloading(false);
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <h4 className="mb-3">Download Selected Images as ZIP</h4>
        <div className="d-flex flex-wrap mb-3">
          {mediaList.map(m => (
            <div
              key={m._id}
              className={`me-2 mb-2 p-1 border rounded ${selected.includes(m._id) ? "border-primary border-2" : "border-light"}`}
              style={{ width: 92, cursor: "pointer", transition: "border 0.2s" }}
              onClick={() => toggleSelect(m._id)}
            >
              <img src={m.imageUrl} alt={m.title} width={80} className="rounded mb-1" />
              <div style={{ fontSize: 11, textAlign: "center" }}>{m.title}</div>
            </div>
          ))}
        </div>
        <Button
          disabled={!selected.length || downloading}
          onClick={downloadZip}
          variant="success"
          className="w-100"
        >
          {downloading ? "Downloading..." : "Download ZIP"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ZipDownloadPanel;
