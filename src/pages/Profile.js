// src/pages/Profile.js

import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Card, Spinner, Alert, Image, Row, Col } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import ToastNotification from '../components/ToastNotification';
import './Profile.css'; // Import custom CSS for Profile page

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({ name: '', email: '', avatar: '' });
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });

  // State for Password Change
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [validatedProfile, setValidatedProfile] = useState(false);
  const [validatedPassword, setValidatedPassword] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/auth/user');
        setProfileData({
          name: response.data.name,
          email: response.data.email,
          avatar: response.data.avatar,
        });
        setPreviewAvatar(response.data.avatar);
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

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidatedProfile(true);
      return;
    }

    setIsUpdatingProfile(true);
    setIsError(false);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('name', profileData.name);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const response = await axiosInstance.put('/auth/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfileData({
        ...profileData,
        name: response.data.name,
        avatar: response.data.avatar,
      });
      setAvatarFile(null);
      setPreviewAvatar(response.data.avatar);
      setToast({
        show: true,
        message: 'Profile updated successfully!',
        variant: 'success',
      });
      setIsUpdatingProfile(false);
      setValidatedProfile(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setErrorMsg(error.response?.data?.message || 'Failed to update profile.');
      setIsError(true);
      setIsUpdatingProfile(false);
      setToast({
        show: true,
        message: error.response?.data?.message || 'Failed to update profile.',
        variant: 'danger',
      });
    }
  };

  const handlePasswordSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidatedPassword(true);
      return;
    }

    // Frontend Validation
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      setIsError(true);
      setToast({
        show: true,
        message: 'New passwords do not match.',
        variant: 'danger',
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      setIsError(true);
      setToast({
        show: true,
        message: 'New password must be at least 6 characters long.',
        variant: 'danger',
      });
      return;
    }

    setIsUpdatingPassword(true);
    setPasswordError('');
    setIsError(false);
    setErrorMsg('');

    try {
      const response = await axiosInstance.put('/auth/user/change-password', passwordData);
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setToast({
        show: true,
        message: 'Password updated successfully!',
        variant: 'success',
      });
      setIsUpdatingPassword(false);
      setValidatedPassword(false);
    } catch (error) {
      console.error('Failed to update password:', error);
      setPasswordError(error.response?.data?.message || 'Failed to update password.');
      setIsError(true);
      setIsUpdatingPassword(false);
      setToast({
        show: true,
        message: error.response?.data?.message || 'Failed to update password.',
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
      {isError && (passwordError || errorMsg) && (
        <Alert variant="danger">{passwordError || errorMsg}</Alert>
      )}

      <Row>
        {/* Profile Update Section */}
        <Col md={6} sm={12} className="mb-4">
          <Card>
            <Card.Header>Update Profile</Card.Header>
            <Card.Body>
              <Form
                noValidate
                validated={validatedProfile}
                onSubmit={handleProfileSubmit}
                encType="multipart/form-data"
              >
                {/* Avatar Upload */}
                <Form.Group controlId="formAvatar" className="mb-3">
                  <Form.Label>Avatar</Form.Label>
                  <div className="d-flex align-items-center">
                    <Image
                      src={previewAvatar || '/default-avatar.png'}
                      roundedCircle
                      width={80}
                      height={80}
                      className="me-3 avatar-preview"
                      alt="User Avatar"
                    />
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      isInvalid={isError && !avatarFile}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select a valid image file.
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>

                {/* Name Field */}
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email Field */}
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    required
                    disabled // Assuming email is not editable
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isUpdatingProfile}>
                  {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Password Change Section */}
        <Col md={6} sm={12} className="mb-4">
          <Card>
            <Card.Header>Change Password</Card.Header>
            <Card.Body>
              <Form
                noValidate
                validated={validatedPassword}
                onSubmit={handlePasswordSubmit}
              >
                {/* Current Password */}
                <Form.Group controlId="formCurrentPassword" className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter current password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your current password.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* New Password */}
                <Form.Group controlId="formNewPassword" className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a new password.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Confirm New Password */}
                <Form.Group controlId="formConfirmNewPassword" className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    name="confirmNewPassword"
                    value={passwordData.confirmNewPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please confirm your new password.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="secondary" type="submit" disabled={isUpdatingPassword}>
                  {isUpdatingPassword ? 'Updating...' : 'Change Password'}
                </Button>
              </Form>
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

export default Profile;
