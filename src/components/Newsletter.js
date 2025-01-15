// src/components/Newsletter.js

import React, { useState } from 'react';
import { Container, Form, Button, Alert, InputGroup, Spinner } from 'react-bootstrap';
import { FaEnvelope, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Newsletter.css';
import axios from 'axios';
import AOS from 'aos';

// Define validation schema using yup
const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
});

const Newsletter = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setStatus({ submitted: false, success: false, message: '' });
    setLoading(true);
    try {
      // Replace with your backend endpoint or email service integration
      await axios.post('/api/newsletter/signup', { email: data.email });
      setStatus({ submitted: true, success: true, message: 'Thank you for subscribing!' });
      reset();
    } catch (error) {
      setStatus({
        submitted: true,
        success: false,
        message: 'There was an error subscribing. Please try again later.',
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="newsletter-container my-5" id="newsletter" data-aos="fade-up">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="newsletter-title text-center mb-3">
          <FaEnvelope className="newsletter-icon me-2" />
          Subscribe to Our Newsletter
        </h2>
        <p className="newsletter-description text-center mb-4">
          Stay updated with our latest news and offers. Enter your email below to subscribe to our newsletter.
        </p>

        {status.submitted && (
          <Alert
            variant={status.success ? 'success' : 'danger'}
            onClose={() => setStatus({ ...status, submitted: false })}
            dismissible
            aria-live="assertive"
          >
            {status.success ? (
              <span>
                <FaCheckCircle className="me-2" />
                {status.message}
              </span>
            ) : (
              <span>
                <FaTimesCircle className="me-2" />
                {status.message}
              </span>
            )}
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)} className="d-flex justify-content-center">
          <InputGroup className="w-50">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              isInvalid={!!errors.email}
              aria-label="Email Address"
            />
            <Button variant="success" type="submit" disabled={loading}>
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
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </Button>
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form>
      </motion.div>
    </Container>
  );
};

export default React.memo(Newsletter);
