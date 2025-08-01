import React, { useEffect, useState } from "react";
import api from "../../api/api";
import ContactForm from "./ContactForm";

const MessageList = ({ isAdmin }) => {
  const [messages, setMessages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
  }, [reload]);

  const fetchMessages = async () => {
    try {
      let res;
      if (isAdmin) {
        res = await api.get("/contact/admin/all");
      } else {
        res = await api.get("/contact/my-messages");
      }
      setMessages(res.data);
    } catch {
      alert("Failed to load messages.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      if (isAdmin) await api.delete(`/contact/admin/${id}`);
      else await api.delete(`/contact/${id}`);
      setReload(r => !r);
    } catch {
      alert("Delete failed.");
    }
  };

  return (
    <div>
      <h3>{isAdmin ? "All Contact Messages" : "My Messages"}</h3>
      {editing ? (
        <ContactForm initial={editing} onSubmitSuccess={() => {
          setEditing(null);
          setReload(r => !r);
        }} />
      ) : (
        <ul>
          {messages.map(m => (
            <li key={m._id} style={{ border: "1px solid #ccc", margin: 6, padding: 6 }}>
              <b>{m.name}</b> ({m.email})<br />
              {m.message}<br />
              <small>{new Date(m.createdAt).toLocaleString()}</small>
              {!isAdmin && (
                <>
                  <button onClick={() => setEditing(m)}>Edit</button>
                  <button onClick={() => handleDelete(m._id)}>Delete</button>
                </>
              )}
              {isAdmin && (
                <button onClick={() => handleDelete(m._id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      )}
      {editing && <button onClick={() => setEditing(null)}>Cancel Edit</button>}
    </div>
  );
};

export default MessageList;
