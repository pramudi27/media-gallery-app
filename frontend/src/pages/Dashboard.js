import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import api from "../api/api";
import { Card, Row, Col, Container, Spinner, Alert, Badge } from "react-bootstrap";

const Dashboard = () => {
  const { isLoggedIn, loading, user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentMedia, setRecentMedia] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchStatsAndMedia = async () => {
      try {
        const res = await api.get("/media");
        setStats({
          total: res.data.length,
        });
        setRecentMedia(res.data.slice(-5).reverse());
      } catch {
        setStats({ total: 0 });
        setRecentMedia([]);
      }
    };
    fetchStatsAndMedia();
  }, [isLoggedIn]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow mb-4">
            <Card.Body>
              <h2 className="fw-bold mb-3">Welcome, {user?.name || "User"}!</h2>
              <div className="mb-2">
                <span className="fw-semibold text-secondary">Email:</span> {user?.email}<br />
                <span className="fw-semibold text-secondary">Role:</span> <Badge bg="info" className="text-light">{user?.role}</Badge>
              </div>
            </Card.Body>
          </Card>

          <Row>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <h4 className="mb-3">Media Stats</h4>
                  <div>
                    <span className="fw-semibold">Total Uploads: </span>
                    <span className="fs-5">{stats ? stats.total : "..."}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <h4 className="mb-3">Recent Uploads</h4>
                  {recentMedia.length === 0 ? (
                    <Alert variant="info" className="py-2">No uploads yet.</Alert>
                  ) : (
                    <Row>
                      {recentMedia.map((m) => (
                        <Col xs={6} sm={4} className="mb-3" key={m._id}>
                          <Link to={`/media/${m._id}`} className="text-decoration-none">
                            <Card className="border-0 shadow-sm h-100 hover-shadow" style={{ cursor: "pointer" }}>
                              <Card.Img
                                src={m.imageUrl}
                                alt={m.title}
                                variant="top"
                                style={{ height: 80, objectFit: "cover", borderRadius: 8 }}
                              />
                              <Card.Body className="p-2">
                                <div className="text-center fw-semibold small text-dark">
                                  {m.title}
                                </div>
                              </Card.Body>
                            </Card>
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
