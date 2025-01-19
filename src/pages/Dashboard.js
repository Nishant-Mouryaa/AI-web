// src/pages/Dashboard.js

import React, { useContext, useCallback, useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for client-side navigation
import axiosInstance from '../api/axiosInstance'; // Import the Axios instance
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import UserDetails from '../components/Dashboard/UserDetails';
import WebsitePreferences from '../components/Dashboard/WebsitePreferences';
import DescriptionSection from '../components/Dashboard/DescriptionSection';
import ToastNotification from '../components/ToastNotification'; // Toast component for notifications
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // Import React Query hooks
import './Dashboard.css'; // Import custom CSS for Dashboard

const Dashboard = () => {
  const { logout } = useContext(AuthContext); // Get logout function from context
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Destructure useState for consistency
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });

  // Fetch user data using React Query
  const { data: userData, isLoading, isError, error } = useQuery(
    ['userData'],
    async () => {
      const response = await axiosInstance.get('/auth/user');
      return response.data;
    },
    {
      onError: (err) => {
        setToast({ show: true, message: 'Error fetching user data', variant: 'danger' });
      },
    }
  );
  
  // Mutation for updating preferences
  const updatePreferencesMutation = useMutation(
    (newPreferences) => axiosInstance.put('/auth/user/preferences', newPreferences),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['userData'], (oldData) => ({
          ...oldData,
          websitePreferences: data.data.websitePreferences,
        }));
        setToast({ show: true, message: 'Preferences updated successfully!', variant: 'success' });
      },
      onError: (err) => {
        console.error('Failed to update preferences:', err);
        setToast({ show: true, message: 'Failed to update preferences.', variant: 'danger' });
      },
    }
  );

  // Mutation for updating description
  const updateDescriptionMutation = useMutation(
    (newDescription) => axiosInstance.put('/auth/user/description', { description: newDescription }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['userData'], (oldData) => ({
          ...oldData,
          description: data.data.description,
        }));
        setToast({ show: true, message: 'Description updated successfully!', variant: 'success' });
      },
      onError: (err) => {
        console.error('Failed to update description:', err);
        setToast({ show: true, message: 'Failed to update description.', variant: 'danger' });
      },
    }
  );

  // Mutation for updating user details
  const updateUserDetailsMutation = useMutation(
    (newName) => axiosInstance.put('/auth/user/name', { name: newName }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['userData'], (oldData) => ({
          ...oldData,
          name: data.data.name,
        }));
        setToast({ show: true, message: 'Name updated successfully!', variant: 'success' });
      },
      onError: (err) => {
        console.error('Failed to update name:', err);
        setToast({ show: true, message: 'Failed to update name.', variant: 'danger' });
      },
    }
  );

  // Handler for logout
  const handleLogout = useCallback(() => {
    logout(); // Clear authentication state and token
    navigate('/'); // Redirect to Home or Login page
  }, [logout, navigate]);

  // Handlers to trigger mutations
  const updatePreferences = useCallback(
    (newPreferences) => {
      updatePreferencesMutation.mutate(newPreferences);
    },
    [updatePreferencesMutation]
  );

  const updateDescription = useCallback(
    (newDescription) => {
      updateDescriptionMutation.mutate(newDescription);
    },
    [updateDescriptionMutation]
  );

  const updateUserDetails = useCallback(
    (newName) => {
      updateUserDetailsMutation.mutate(newName);
    },
    [updateUserDetailsMutation]
  );

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
    // Since the error is handled via toast, you might opt to remove the Alert
    // However, keeping it can aid accessibility
    return (
      <DashboardLayout>
        <div className="mt-5 text-center">
          <Alert variant="danger">
            An error occurred while fetching your data. Please try refreshing the page or{' '}
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
          <UserDetails email={userData.email} name={userData.name} updateUserDetails={updateUserDetails} />

          <WebsitePreferences preferences={userData.websitePreferences} updatePreferences={updatePreferences} />

          <DescriptionSection description={userData.description} updateDescription={updateDescription} />
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
