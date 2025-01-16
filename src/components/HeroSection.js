// src/components/HeroSection.js

import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './HeroSection.css';
import GetStartedButton from './GetStartedButton'; // Corrected import path
import { Link } from 'react-router-dom'; // Ensure this is imported

const HeroSection = ({ title, subtitle }) => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true,      // Whether animation should happen only once
    });
  }, []);

  const heroStyle = {
    // Removed backgroundImage
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    padding: '100px 0',
    color: '#333', // Changed to white for better contrast with overlay
    textAlign: 'center',
    backgroundColor: '#fff', // Added a solid background color
  };

  const handleGetStarted = () => {
    // Define what happens when the button is clicked
    // For example, scroll to a section, open a modal, etc.
    window.location.href = '#Feature-container'; // Example: Scroll to features section
  };

  return (
    <section style={heroStyle} id="hero" className="d-flex align-items-center justify-content-center">
      {/* Overlay */}
      <div className="overlay"></div>

      <Container data-aos="fade-in">
        <motion.h1
          className="display-4 hero-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="lead hero-subtitle"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}
        {/* CTA Buttons */}
        <motion.div
          className="hero-buttons mt-4 d-flex flex-wrap justify-content-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <GetStartedButton
            onClick={handleGetStarted}
            text="Get Started"
            to="/get-started" // Ensure this route exists
            variant="primary"
            size="lg"
            className="me-3 mb-2" // Added mb-2 for spacing on smaller screens
          />
          <Button
            variant="outline-dark"
            size="lg"
            className="ms-3 mb-2"
            as={Link}
            to="#learn-more"
            aria-label="Learn More"
           >
          Learn More
          </Button>
        </motion.div>
        {/* Scroll Down Indicator */}
        <motion.div
          className="scroll-down mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          data-aos="fade-up"
        >
          <a href="#Feature-container" aria-label="Scroll Down">
            <FaArrowDown className="scroll-icon" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
};

export default HeroSection;
