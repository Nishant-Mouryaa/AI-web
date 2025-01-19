// src/pages/Dashboard.js

import React, { useContext, useCallback } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance'; // Import the Axios instance
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom';
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

  const [toast, setToast] = React.useState({ show: false, message: '', variant: '' }); // Toast notifications

  // Fetch user data using React Query
  const { data: userData, isLoading, isError, error } = useQuery(
    ['userData'],
    async () => {
      const response = await axiosInstance.get('/auth/user');
      return response.data;
    },
    {
      onError: (err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setToast({ show: true, message: err.response.data.message, variant: 'danger' });
        } else {
          setToast({ show: true, message: 'Failed to fetch user data', variant: 'danger' });
        }
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
  const updatePreferences = (newPreferences) => {
    updatePreferencesMutation.mutate(newPreferences);
  };

  const updateDescription = (newDescription) => {
    updateDescriptionMutation.mutate(newDescription);
  };

  const updateUserDetails = (newName) => {
    updateUserDetailsMutation.mutate(newName);
  };

  // Handler to close toast
  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

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

  if (isError) {
    // Assuming error message is already handled in onError via toast
    return (
      <DashboardLayout>
        <Alert variant="danger" className="mt-5">
          An error occurred while fetching your data.
          <Alert.Link href="/login"> Go to Login</Alert.Link>
        </Alert>
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
