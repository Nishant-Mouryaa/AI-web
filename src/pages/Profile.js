// src/pages/Profile.js

import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import ToastNotification from '../components/ToastNotification';

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/auth/user');
        setProfileData({ name: response.data.name, email: response.data.email });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setErrorMsg(error.response?.data?.message || 'Failed to fetch profile data.');
        setIsError(true);
        setIsLoading(false);
        setToast({
          show: true,
          message: error.response?.data?.message || 'Failed to fetch profile data.',
          variant: 'danger',
        });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');

    try {
      const response = await axiosInstance.put('/auth/user/profile', profileData);
      setProfileData({ name: response.data.name, email: response.data.email });
      setToast({
        show: true,
        message: 'Profile updated successfully!',
        variant: 'success',
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setErrorMsg(error.response?.data?.message || 'Failed to update profile.');
      setIsError(true);
      setIsLoading(false);
      setToast({
        show: true,
        message: error.response?.data?.message || 'Failed to update profile.',
        variant: 'danger',
      });
    }
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Loading your profile...</span>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4">My Profile</h2>
      {isError && <Alert variant="danger">{errorMsg}</Alert>}
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                required
                disabled // Assuming email is not editable
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Profile'}
            </Button>
          </Form>
        </Card.Body>
      </Card>

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

export default Profile;
