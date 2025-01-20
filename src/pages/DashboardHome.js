// src/pages/DashboardHome.js

import React, { useState, useEffect, useMemo } from 'react';
import { Spinner, Alert, Card, Row, Col, Button } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance';
import ToastNotification from '../components/ToastNotification';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import './DashboardHome.css'; // Import custom CSS for DashboardHome

const DashboardHome = () => {
  const [userData, setUserData] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userResponse, subscriptionResponse, revenueResponse] = await Promise.all([
          axiosInstance.get('/auth/user'),
          axiosInstance.get('/auth/user/subscriptions'),
          axiosInstance.get('/auth/user/revenue'),
        ]);

        setUserData(userResponse.data);

        // Example subscription data
        setSubscriptionData(subscriptionResponse.data);

        // Example revenue data
        setRevenueData(revenueResponse.data);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setErrorMsg(error.response?.data?.message || 'Failed to fetch dashboard data.');
        setIsError(true);
        setIsLoading(false);
        setToast({
          show: true,
          message: error.response?.data?.message || 'Failed to fetch dashboard data.',
          variant: 'danger',
        });
      }
    };

    fetchDashboardData();
  }, []);

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  // Prepare data for PieChart (e.g., Revenue by Source)
  const revenueBySource = useMemo(() => {
    if (!userData) return [];
    // Example structure
    return userData.revenueBySource.map((source) => ({
      name: source.source,
      value: source.amount,
    }));
  }, [userData]);

  // Colors for PieChart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];

  // Sample insights based on userData
  const insights = useMemo(() => {
    if (!userData) return null;
    return {
      growth: userData.subscriptionGrowthPercentage,
      topSource: userData.topRevenueSource,
      recommendations: `Consider focusing on enhancing features for ${userData.topRevenueSource} to further boost your revenue.`,
    };
  }, [userData]);

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
          {errorMsg}. Please try refreshing the page or{' '}
          <Button variant="link" onClick={() => window.location.reload()}>
            Retry
          </Button>
          .
        </Alert>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4">Dashboard Overview</h2>
      <Row className="mb-4">
        {/* Total Users */}
        <Col md={4} sm={6} xs={12}>
          <Card className="mb-4 shadow-sm">
            <Card.Body className="text-center">
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="display-4">{userData.totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Active Subscriptions */}
        <Col md={4} sm={6} xs={12}>
          <Card className="mb-4 shadow-sm">
            <Card.Body className="text-center">
              <Card.Title>Active Subscriptions</Card.Title>
              <Card.Text className="display-4">{userData.activeSubscriptions}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Revenue */}
        <Col md={4} sm={12} xs={12}>
          <Card className="mb-4 shadow-sm">
            <Card.Body className="text-center">
              <Card.Title>Revenue</Card.Title>
              <Card.Text className="display-4">${userData.revenue.toLocaleString()}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Data Visualization */}
      <Row>
        {/* Subscriptions Over Time - Line Chart */}
        <Col md={6} sm={12} xs={12} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Active Subscriptions Over Time</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={subscriptionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="activeSubscriptions" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Revenue Over Time - Bar Chart */}
        <Col md={6} sm={12} xs={12} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Revenue Over Time</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Revenue by Source - Pie Chart */}
        <Col md={6} sm={12} xs={12} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Revenue by Source</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueBySource}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {revenueBySource.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Additional Insights or Recommendations */}
        <Col md={6} sm={12} xs={12} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Insights</Card.Title>
              <p>
                <strong>Growth:</strong> Your active subscriptions have increased by{' '}
                {insights.growth}% compared to last month.
              </p>
              <p>
                <strong>Top Source:</strong> Most of your revenue is coming from{' '}
                {insights.topSource}.
              </p>
              <p>
                <strong>Recommendations:</strong> {insights.recommendations}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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
