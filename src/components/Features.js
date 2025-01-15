// src/components/Features.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaRobot, FaPalette, FaMobileAlt, FaLock } from 'react-icons/fa';
import FeatureCard from './FeatureCard';
import './Features.css'; // Import custom CSS for additional styling

const Features = () => {
  const featureData = [
    {
      icon: <FaRobot size={50} />,
      title: 'AI-Powered Suggestions',
      description:
        'Get intelligent website template recommendations tailored to your industry and preferences.',
      moreInfo:
        'Our AI analyzes your business needs to suggest the best templates that align with your goals.',
    },
    {
      icon: <FaPalette size={50} />,
      title: 'Customizable Designs',
      description:
        'Easily customize templates to match your brand’s look and feel without any coding.',
      moreInfo:
        'Modify colors, fonts, layouts, and more with our intuitive design tools.',
    },
    {
      icon: <FaMobileAlt size={50} />,
      title: 'Responsive Layouts',
      description:
        'Ensure your website looks great on all devices, from desktops to mobile phones.',
      moreInfo:
        'Our templates are built to be fully responsive, providing a seamless experience across all devices.',
    },
    {
      icon: <FaLock size={50} />,
      title: 'Secure Hosting',
      description:
        'Enjoy secure and reliable hosting with robust protection for your website data.',
      moreInfo:
        'We prioritize your security with advanced measures to keep your website safe and online.',
    },
  ];

  return (
    <Container id="Feature-container" className="my-5">
      <h2 className="text-center mb-4">Why Choose AI Builder?</h2>
      <Row>
        {featureData.map((feature, index) => (
          <Col
            key={index}
            xs={12}
            md={6}
            lg={3}
            className="mb-4"
            data-aos="fade-up"
            data-aos-delay={index * 100} // Staggered animation delay
          >
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              moreInfo={feature.moreInfo}
              delay={index * 0.2} // Pass delay for animation
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Features;
