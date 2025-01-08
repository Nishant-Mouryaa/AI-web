// src/pages/Signup.js

import React, { useState, useContext } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; // Import the Axios instance
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate(); // For navigation after signup
  const { login } = useContext(AuthContext); // Get login function from context
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    websiteType: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { email, password, websiteType, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic frontend validation
    if (!websiteType) {
      setError('Please select a website type');
      return;
    }

    try {
      setLoading(true);
      // Make a POST request to the backend signup endpoint
      const response = await axiosInstance.post('/auth/register', {
        email,
        password,
        websiteType,
        description,
      });

      // Assuming the backend returns a token on successful registration
      const { token } = response.data;

      // Update auth context and store token
      login(token);

      // Redirect to Dashboard
      navigate('/dashboard');
    } catch (err) {
      // Handle errors (e.g., email already exists)
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to create account');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Sign Up</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={onSubmit}>
        {/* Email Field */}
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </Form.Group>

        {/* Password Field */}
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password (min 6 characters)"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </Form.Group>

        {/* Website Type Field */}
        <Form.Group controlId="formWebsiteType" className="mb-3">
          <Form.Label>Website Type</Form.Label>
          <Form.Select
            name="websiteType"
            value={websiteType}
            onChange={onChange}
            required
          >
            <option value="">-- Select Website Type --</option>
            <option value="blog">Blog</option>
            <option value="portfolio">Portfolio</option>
            <option value="ecommerce">E-commerce</option>
            <option value="business">Business</option>
            {/* Add more options as needed */}
          </Form.Select>
        </Form.Group>

        {/* Description Field */}
        <Form.Group controlId="formDescription" className="mb-4">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Describe your website needs"
            name="description"
            value={description}
            onChange={onChange}
            required
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </Form>
      <div className="mt-3 text-center">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </Container>
  );
};

export default Signup;
