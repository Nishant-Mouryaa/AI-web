// src/components/Contact.js

import React, { useState } from 'react';
import { Container, Form, Button, Alert, InputGroup, Spinner, Modal } from 'react-bootstrap';
import { FaEnvelope, FaCheckCircle, FaTimesCircle, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Contact.css';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

// Define validation schema using yup
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(50, 'Name cannot exceed 50 characters'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  message: yup
    .string()
    .required('Message is required')
    .max(500, 'Message cannot exceed 500 characters'),
  // captcha: yup.string().required('Please verify that you are not a robot'), // Uncomment if using CAPTCHA
});

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [status, setStatus] = useState({
    submitted: false,
    error: false,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null); // State for CAPTCHA
  const [showModal, setShowModal] = useState(false); // State for confirmation modal

  const onSubmit = async (data) => {
    if (!captchaValue) {
      setStatus({ submitted: true, error: true, message: 'Please verify that you are not a robot.' });
      return;
    }

    setStatus({ submitted: false, error: false, message: '' });
    setLoading(true);
    try {
      // Replace with your backend endpoint or email service integration
      await axios.post('/api/contact', { ...data, captcha: captchaValue });
      setStatus({ submitted: true, error: false, message: 'Your message has been sent successfully!' });
      reset();
      setCaptchaValue(null);
      setShowModal(true); // Show confirmation modal
    } catch (error) {
      setStatus({
        submitted: true,
        error: true,
        message: 'There was an error sending your message. Please try again later.',
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  // Initialize AOS
  React.useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration in milliseconds
      once: true,     // Whether animation should happen only once
    });
  }, []);

  return (
    <Container className="contact-container my-5" id="contact" data-aos="fade-up">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="contact-title text-center mb-3">
          <FaEnvelope className="contact-icon me-2" />
          Contact Us
        </h2>
        <p className="contact-description text-center mb-4">
          Have any questions or need assistance? Send us a message, and we'll get back to you shortly.
        </p>

        {status.submitted && (
          <Alert
            variant={status.error ? 'danger' : 'success'}
            onClose={() => setStatus({ ...status, submitted: false })}
            dismissible
            aria-live="assertive"
          >
            {status.error ? (
              <span>
                <FaTimesCircle className="me-2" />
                {status.message}
              </span>
            ) : (
              <span>
                <FaCheckCircle className="me-2" />
                {status.message}
              </span>
            )}
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)} className="contact-form">
          <Form.Group controlId="contactName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaEnvelope />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                {...register('name')}
                isInvalid={!!errors.name}
                aria-label="Name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="contactEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaEnvelope />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                isInvalid={!!errors.email}
                aria-label="Email Address"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="contactMessage" className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter your message"
              {...register('message')}
              isInvalid={!!errors.message}
              aria-label="Message"
            />
            <Form.Control.Feedback type="invalid">
              {errors.message?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* CAPTCHA Integration (Optional) */}
          {/* 
          <Form.Group controlId="contactCaptcha" className="mb-3">
            <ReCAPTCHA
              sitekey="YOUR_GOOGLE_RECAPTCHA_SITE_KEY"
              onChange={handleCaptchaChange}
              className="captcha-container"
            />
            {errors.captcha && <span className="text-danger">{errors.captcha.message}</span>}
          </Form.Group>
          */}

          <Button variant="primary" type="submit" disabled={loading} className="submit-button">
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </Form>

        {/* Confirmation Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Thank You!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Your message has been sent successfully. We will get back to you shortly.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Social Media Links */}
        <div className="social-media-links text-center mt-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">
            <FaFacebookF className="social-icon" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="me-3">
            <FaTwitter className="social-icon" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="social-icon" />
          </a>
        </div>
      </motion.div>
    </Container>
  );
};

export default React.memo(Contact);
