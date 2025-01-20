// src/pages/SettingsAccount.js

import React, { useState } from 'react';
import { Form, Button, Card, Spinner, Alert, Modal } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance';
import ToastNotification from '../components/ToastNotification';

const SettingsAccount = () => {
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.put('/auth/user/settings/account/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setToast({ show: true, message: 'Password updated successfully!', variant: 'success' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setLoading(false);
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password.');
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="mb-4">Account Settings</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Current Password */}
            <Form.Group controlId="formCurrentPassword" className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter current password" 
                name="currentPassword" 
                value={passwordData.currentPassword} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            {/* New Password */}
            <Form.Group controlId="formNewPassword" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter new password" 
                name="newPassword" 
                value={passwordData.newPassword} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            {/* Confirm New Password */}
            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Confirm new password" 
                name="confirmPassword" 
                value={passwordData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Toast Notification */}
      <ToastNotification
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ ...toast, show: false })}
      />

      {/* Optional: Modal Confirmation Before Password Change */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Password Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to change your password?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SettingsAccount;
 
