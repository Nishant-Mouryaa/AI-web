// src/pages/Dashboard.js

import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, Spinner, Alert, Button } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance'; // Import the Axios instance
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useContext(AuthContext); // Get logout function from context
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null); // To store user details
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(''); // To handle error messages

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make GET request to the protected backend route
        const response = await axiosInstance.get('/auth/user');
        setUserData(response.data); // Store user data
      } catch (err) {
        // Handle errors (e.g., invalid token)
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Failed to fetch user data');
        }
        console.error(err);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchUserData();
  }, []);

  // Handler for logout
  const handleLogout = () => {
    logout(); // Clear authentication state and token
    navigate('/'); // Redirect to Home or Login page
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Loading your dashboard...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4">Dashboard</h2>
      <Card className="mb-4">
        <Card.Header>User Details</Card.Header>
        <Card.Body>
          <Card.Title>Email</Card.Title>
          <Card.Text>{userData.email}</Card.Text>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>Website Preferences</Card.Header>
        <Card.Body>
          <Card.Title>Theme</Card.Title>
          <Card.Text>{userData.websitePreferences.theme}</Card.Text>

          <Card.Title>Layout</Card.Title>
          <Card.Text>{userData.websitePreferences.layout}</Card.Text>

          <Card.Title>Color Scheme</Card.Title>
          <Card.Text>{userData.websitePreferences.colorScheme}</Card.Text>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>Description</Card.Header>
        <Card.Body>
          <Card.Text>{userData.description}</Card.Text>
        </Card.Body>
      </Card>

      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
