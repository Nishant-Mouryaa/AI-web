// src/components/CTA.js

import React from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './CTA.css'; // Import custom CSS for additional styling

const CTA = () => {
  return (
    <Container className="cta-section my-5" id="cta">
      <Row className="align-items-center">
        {/* Text Content */}
        <Col
          xs={12}
          md={6}
          className="text-center text-md-start"
          data-aos="fade-right"
        >
          <h2 className="cta-heading">Ready to Build Your Dream Website?</h2>
          <p className="cta-subheading mb-4">
            Join thousands of satisfied users and create your website effortlessly.
          </p>
          <Button
            variant="success"
            size="lg"
            href="/get-started"
            className="cta-button"
            aria-label="Get Started Now"
          >
            Get Started Now <FaArrowRight className="ms-2" />
          </Button>
        </Col>
        {/* Image or Illustration */}
        <Col
          xs={12}
          md={6}
          className="text-center mt-4 mt-md-0"
          data-aos="fade-left"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <LazyLoadImage
              src="https://i.postimg.cc/3xkYXkH9/cta-image.png" // Replace with your image URL
              alt="Build Your Dream Website"
              className="img-fluid cta-image"
              effect="blur"
            />
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default CTA;
