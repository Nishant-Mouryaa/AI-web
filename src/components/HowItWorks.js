// src/components/HowItWorks.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaSearch, FaEdit, FaRocket } from 'react-icons/fa';
import HowItWorksCard from './HowItWorksCard';
import './HowItWorks.css'; // Import custom CSS for additional styling

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch size={40} />,
      title: '1. Choose Your Industry',
      description: 'Select your industry to receive tailored website template suggestions.',
      moreInfo:
        'Our AI analyzes your business sector to recommend the most suitable templates that align with your goals.',
    },
    {
      icon: <FaEdit size={40} />,
      title: '2. Customize Your Template',
      description: 'Easily customize the selected template to match your brand’s identity.',
      moreInfo:
        'Modify colors, fonts, layouts, and more with our intuitive design tools without any coding knowledge.',
    },
    {
      icon: <FaRocket size={40} />,
      title: '3. Launch Your Website',
      description: 'Deploy your website with secure hosting and enjoy a stunning online presence.',
      moreInfo:
        'Publish your site effortlessly and ensure it remains fast, secure, and accessible to your audience.',
    },
  ];

  return (
    <Container className="my-5" id="HowItWorks-container">
      <h2 className="text-center mb-4">How It Works</h2>
      <Row>
        {steps.map((step, index) => (
          <Col
            key={index}
            xs={12}
            md={4}
            className="mb-4"
            data-aos="fade-up"
            data-aos-delay={index * 100} // Staggered animation delay
          >
            <HowItWorksCard
              icon={step.icon}
              title={step.title}
              description={step.description}
              moreInfo={step.moreInfo}
              delay={index * 0.2} // Pass delay for animation
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HowItWorks;
