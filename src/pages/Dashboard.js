// src/pages/Dashboard.js

import React, { useContext, useCallback, useState, useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for client-side navigation
import axiosInstance from '../api/axiosInstance'; // Import the Axios instance
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import UserDetails from '../components/Dashboard/UserDetails';
import WebsitePreferences from '../components/Dashboard/WebsitePreferences';
import DescriptionSection from '../components/Dashboard/DescriptionSection';
import ToastNotification from '../components/ToastNotification'; // Toast component for notifications
import './Dashboard.css'; // Import custom CSS for Dashboard

const Dashboard = () => {
  const { logout } = useContext(AuthContext); // Get logout function from context
  const navigate = useNavigate();

  // State for user data, loading, and errors
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // State for toast notifications
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/auth/user');
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMsg(
          error.response?.data?.message || 'Failed to fetch user data.'
        );
        setIsError(true);
        setIsLoading(false);
        setToast({
          show: true,
          message:
            error.response?.data?.message || 'Failed to fetch user data.',
          variant: 'danger',
        });
      }
    };

    fetchUserData();
  }, []);

  // Handler for logout
  const handleLogout = useCallback(() => {
    logout(); // Clear authentication state and token
    navigate('/'); // Redirect to Home or Login page
  }, [logout, navigate]);

  // Handlers for updating data
  const updatePreferences = async (newPreferences) => {
    try {
      const response = await axiosInstance.put(
        '/auth/user/preferences',
        newPreferences
      );
      setUserData((prevData) => ({
        ...prevData,
        websitePreferences: response.data.websitePreferences,
      }));
      setToast({
        show: true,
        message: 'Preferences updated successfully!',
        variant: 'success',
      });
    } catch (error) {
      console.error('Failed to update preferences:', error);
      setToast({
        show: true,
        message: 'Failed to update preferences.',
        variant: 'danger',
      });
    }
  };

  const updateDescription = async (newDescription) => {
    try {
      const response = await axiosInstance.put(
        '/auth/user/description',
        { description: newDescription }
      );
      setUserData((prevData) => ({
        ...prevData,
        description: response.data.description,
      }));
      setToast({
        show: true,
        message: 'Description updated successfully!',
        variant: 'success',
      });
    } catch (error) {
      console.error('Failed to update description:', error);
      setToast({
        show: true,
        message: 'Failed to update description.',
        variant: 'danger',
      });
    }
  };

  const updateUserDetails = async (newName) => {
    try {
      const response = await axiosInstance.put('/auth/user/name', {
        name: newName,
      });
      setUserData((prevData) => ({
        ...prevData,
        name: response.data.name,
      }));
      setToast({
        show: true,
        message: 'Name updated successfully!',
        variant: 'success',
      });
    } catch (error) {
      console.error('Failed to update name:', error);
      setToast({
        show: true,
        message: 'Failed to update name.',
        variant: 'danger',
      });
    }
  };

  // Handler to close toast
  const handleCloseToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  // Loading State
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" role="status" />
          <span className="ms-2">Loading your dashboard...</span>
        </div>
      </DashboardLayout>
    );
  }

  // Error State
  if (isError) {
    return (
      <DashboardLayout>
        <div className="mt-5 text-center">
          <Alert variant="danger">
            {errorMsg} Please try refreshing the page or{' '}
            <Link to="/login">go to Login</Link>.
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <DashboardLayout>
        <div className="dashboard-content">
          <h2 className="mb-4">Dashboard</h2>
          <UserDetails
            email={userData.email}
            name={userData.name}
            updateUserDetails={updateUserDetails}
            handleLogout={handleLogout}
          />

          <WebsitePreferences
            preferences={userData.websitePreferences}
            updatePreferences={updatePreferences}
          />

          <DescriptionSection
            description={userData.description}
            updateDescription={updateDescription}
          />
        </div>
      </DashboardLayout>

      {/* Toast Notifications */}
      <ToastNotification
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Dashboard;
