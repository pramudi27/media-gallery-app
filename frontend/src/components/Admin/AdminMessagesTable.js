import React from "react";
import MessageList from "../Contact/MessageList";
import { Container } from "react-bootstrap";

// Admin sees all contact messages
const AdminMessagesTable = () => (
  <Container style={{ maxWidth: 900, margin: "0 auto", marginTop: 40 }}>
    <MessageList isAdmin={true} />
  </Container>
);

export default AdminMessagesTable;
