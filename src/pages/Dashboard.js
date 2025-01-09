// src/pages/Dashboard.js

import React, { useEffect, useState, useContext } from 'react';
import { Container, Spinner, Alert, Row, Col } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance'; // Import the Axios instance
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../components/Dashboard/Navbar';
import DashboardSidebar from '../components/Dashboard/Sidebar';
import UserDetails from '../components/Dashboard/UserDetails';
import WebsitePreferences from '../components/Dashboard/WebsitePreferences';
import DescriptionSection from '../components/Dashboard/DescriptionSection';
// import DashboardFooter from '../components/Dashboard/Footer';

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

  // Handlers to update user data
  const updatePreferences = async (newPreferences) => {
    try {
      const response = await axiosInstance.put('/auth/user/preferences', newPreferences);
      setUserData((prevData) => ({
        ...prevData,
        websitePreferences: response.data.websitePreferences,
      }));
    } catch (err) {
      console.error('Failed to update preferences:', err);
      // Optionally, set error state or show a notification
    }
  };

  const updateDescription = async (newDescription) => {
    try {
      const response = await axiosInstance.put('/auth/user/description', { description: newDescription });
      setUserData((prevData) => ({
        ...prevData,
        description: response.data.description,
      }));
    } catch (err) {
      console.error('Failed to update description:', err);
      // Optionally, set error state or show a notification
    }
  };

  const updateUserDetails = async (newName) => {
    try {
      const response = await axiosInstance.put('/auth/user/name', { name: newName });
      setUserData((prevData) => ({
        ...prevData,
        name: response.data.name,
      }));
    } catch (err) {
      console.error('Failed to update name:', err);
      // Optionally, set error state or show a notification
    }
  };

  if (loading) {
    return (
      <>
        <DashboardNavbar />
        <Container className="mt-5 text-center">
          <Spinner animation="border" role="status" />
          <p className="mt-3">Loading your dashboard...</p>
        </Container>
      </>
    );
  }

  if (error) {
    // Check if the error is related to authentication
    const isAuthError = error.toLowerCase().includes('authentication') || error.toLowerCase().includes('token');

    return (
      <>
        <DashboardNavbar />
        <Container className="mt-5">
          <Alert variant="danger">
            {error}
            {isAuthError && (
              <>
                <Alert.Link href="/login"> Go to Login</Alert.Link>
              </>
            )}
          </Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <DashboardNavbar />
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col xs={12} md={3} lg={2} className="bg-light vh-100">
            <DashboardSidebar />
          </Col>

          {/* Main Content */}
          <Col xs={12} md={9} lg={10} className="py-4 d-flex flex-column">
            <h2 className="mb-4">Dashboard</h2>
            <UserDetails email={userData.email} name={userData.name} updateUserDetails={updateUserDetails} />

            <WebsitePreferences
              preferences={userData.websitePreferences}
              updatePreferences={updatePreferences}
            />

            <DescriptionSection
              description={userData.description}
              updateDescription={updateDescription}
            />

            {/* Push Footer to bottom */}
            <div className="mt-auto">
              {/* <DashboardFooter /> */}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
