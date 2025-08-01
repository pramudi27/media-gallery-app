import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { Table, Button, Spinner, Alert, Container } from "react-bootstrap";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [reload]);

  const fetchUsers = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await api.get("/user/admin/all");
      setUsers(res.data);
    } catch {
      setErr("Failed to load users.");
    }
    setLoading(false);
  };

  const handleDeactivate = async (id) => {
    if (!window.confirm("Deactivate this user?")) return;
    try {
      await api.put(`/user/admin/deactivate/${id}`);
      setReload(r => !r);
    } catch {
      alert("Deactivate failed.");
    }
  };

  return (
    <Container style={{ maxWidth: 900, margin: "0 auto", marginTop: 40 }}>
      <h3 className="mb-4">All Users</h3>
      {err && <Alert variant="danger">{err}</Alert>}
      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive className="bg-white shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`badge ${u.role === "admin" ? "bg-success" : "bg-secondary"}`}>
                    {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                  </span>
                </td>
                <td>
                  {u.isActive ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-danger">Deactivated</span>
                  )}
                </td>
                <td>
                  {u.isActive && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeactivate(u._id)}
                    >
                      Deactivate
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminUserTable;
