// src/components/Contact.js

import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({
    submitted: false,
    error: false,
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple form validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitted: true, error: true, message: 'All fields are required.' });
      return;
    }

    try {
      // Replace with your backend endpoint
      await axios.post('/api/contact', formData);
      setStatus({ submitted: true, error: false, message: 'Your message has been sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({
        submitted: true,
        error: true,
        message: 'There was an error sending your message. Please try again later.',
      });
      console.error(error);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      {status.submitted && (
        <Alert variant={status.error ? 'danger' : 'success'}>{status.message}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="contactName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="contactEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="contactMessage" className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter your message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send Message
        </Button>
      </Form>

      {/* Social Media Links */}
      <div className="text-center mt-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">
          <i className="fab fa-facebook fa-2x"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="me-3">
          <i className="fab fa-twitter fa-2x"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
      </div>
    </Container>
  );
};

export default Contact;
 
