import React from "react";
import ContactForm from "../components/Contact/ContactForm";
import MessageList from "../components/Contact/MessageList";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ContactPage = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isLoggedIn) return <Navigate to="/login" />;

  // Only render the form (no extra container or heading here!)
  return (
    <>
      <ContactForm />
      <MessageList />
    </>
  );
};

export default ContactPage;
