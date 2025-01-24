// src/pages/SettingsProfile.js

import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance';
import ToastNotification from '../components/ToastNotification';

const SettingsProfile = () => {
  const [settings, setSettings] = useState({ theme: 'light', notifications: true });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });

  // State for Form Validation
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axiosInstance.get('/auth/user/settings/profile');
        setSettings({
          theme: response.data.theme || 'light',
          notifications: response.data.notifications !== undefined ? response.data.notifications : true,
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile settings:', err);
        setError(err.response?.data?.message || 'Failed to fetch profile settings.');
        setLoading(false);
        setToast({
          show: true,
          message: err.response?.data?.message || 'Failed to fetch profile settings.',
          variant: 'danger',
        });
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    // Validate form
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setUpdating(true);
    setError('');

    try {
      const response = await axiosInstance.put('/auth/user/settings/profile', settings);
      setSettings({
        theme: response.data.theme,
        notifications: response.data.notifications,
      });
      setToast({
        show: true,
        message: 'Profile settings updated successfully!',
        variant: 'success',
      });
      setValidated(false);
    } catch (err) {
      console.error('Failed to update profile settings:', err);
      setError(err.response?.data?.message || 'Failed to update profile settings.');
      setToast({
        show: true,
        message: err.response?.data?.message || 'Failed to update profile settings.',
        variant: 'danger',
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Loading profile settings...</span>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4">Profile Settings</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* Theme Selection */}
            <Form.Group controlId="formTheme" className="mb-3">
              <Form.Label>Theme</Form.Label>
              <Form.Select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                required
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                {/* Add more themes as needed */}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a valid theme.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Notifications Toggle */}
            <Form.Group controlId="formNotifications" className="mb-3">
              <Form.Check
                type="switch"
                label="Enable Notifications"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={updating}>
              {updating ? 'Updating...' : 'Update Settings'}
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

export default SettingsProfile;
