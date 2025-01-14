// src/components/Newsletter.js

import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus({ submitted: true, success: false, message: 'Please enter a valid email address.' });
      return;
    }

    try {
      // Replace with your backend endpoint or email service integration
      await axios.post('/api/newsletter/signup', { email });
      setStatus({ submitted: true, success: true, message: 'Thank you for subscribing!' });
      setEmail('');
    } catch (error) {
      setStatus({
        submitted: true,
        success: false,
        message: 'There was an error subscribing. Please try again later.',
      });
      console.error(error);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Subscribe to Our Newsletter</h2>
      {status.submitted && (
        <Alert variant={status.success ? 'success' : 'danger'}>{status.message}</Alert>
      )}
      <Form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="me-2 w-50"
        />
        <Button variant="primary" type="submit">
          Subscribe
        </Button>
      </Form>
    </Container>
  );
};

export default Newsletter;
 
