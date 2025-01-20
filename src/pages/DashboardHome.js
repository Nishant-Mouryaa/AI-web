// src/pages/DashboardHome.js

import React, { useState, useEffect } from 'react';
import { Spinner, Alert, Card, Row, Col } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance';
import ToastNotification from '../components/ToastNotification';

const DashboardHome = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/auth/user');
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMsg(error.response?.data?.message || 'Failed to fetch user data.');
        setIsError(true);
        setIsLoading(false);
        setToast({
          show: true,
          message: error.response?.data?.message || 'Failed to fetch user data.',
          variant: 'danger',
        });
      }
    };

    fetchUserData();
  }, []);

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Loading your dashboard...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-5 text-center">
        <Alert variant="danger">
          {errorMsg} Please try refreshing the page or{' '}
          <a href="/login">go to Login</a>.
        </Alert>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4">Dashboard Overview</h2>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>{userData.totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Active Subscriptions</Card.Title>
              <Card.Text>{userData.activeSubscriptions}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Revenue</Card.Title>
              <Card.Text>${userData.revenue}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add more dashboard widgets or components here */}

      {/* Toast Notification */}
      <ToastNotification
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default DashboardHome;
