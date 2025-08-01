import React from "react";
import { Button } from "react-bootstrap";

const ImageSlider = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = React.useState(startIndex || 0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100
      }}
    >
      <Button variant="light"
        onClick={onClose}
        style={{ position: "absolute", top: 24, right: 46, fontSize: 26, padding: 2, opacity: 0.85 }}
      >✖</Button>
      <Button variant="light" onClick={prev} style={{ fontSize: 32, marginRight: 38, opacity: 0.85 }}>⟨</Button>
      <img
        src={images[current].imageUrl}
        alt=""
        style={{
          maxHeight: "80vh", maxWidth: "80vw",
          borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.14)"
        }}
      />
      <Button variant="light" onClick={next} style={{ fontSize: 32, marginLeft: 38, opacity: 0.85 }}>⟩</Button>
    </div>
  );
};

export default ImageSlider;
