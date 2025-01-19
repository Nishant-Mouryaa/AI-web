// src/components/ToastNotification.js

import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './ToastNotification.css'; // Custom CSS for toast

const ToastNotification = ({ show, message, variant, onClose, delay = 3000 }) => {
  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast
        show={show}
        onClose={onClose}
        bg={variant}
        autohide
        delay={delay}
        animation
      >
        <Toast.Header>
          <strong className="me-auto">{variant === 'success' ? 'Success' : 'Error'}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

ToastNotification.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'danger']).isRequired,
  onClose: PropTypes.func.isRequired,
  delay: PropTypes.number,
};

export default ToastNotification;
 
