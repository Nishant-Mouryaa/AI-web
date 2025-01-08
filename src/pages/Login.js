// src/pages/Login.js

import React, { useState, useContext } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; // Import the Axios instance
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Login = () => {
  const navigate = useNavigate(); // For navigation after login
  const { login } = useContext(AuthContext); // Get login function from context
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // To display error messages
  const [loading, setLoading] = useState(false); // To indicate loading state

  const { email, password } = formData;

  // Handler for input changes
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handler for form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error messages

    // Basic frontend validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoading(true); // Start loading
      // Send POST request to the backend
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      // Assuming the backend returns a token on successful authentication
      const { token } = response.data;

      // Update AuthContext and store token in localStorage
      login(token);

      // Redirect to Dashboard
      navigate('/dashboard');
    } catch (err) {
      // Handle errors (e.g., invalid credentials)
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to login. Please try again.');
      }
      console.error(err);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Login</h2>
      {/* Display error message if any */}
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
        <Form.Group controlId="formPassword" className="mb-4">
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

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{' '}
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </Button>
      </Form>
      <div className="mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </Container>
  );
};

export default Login;
