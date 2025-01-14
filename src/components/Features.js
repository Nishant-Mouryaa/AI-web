// src/components/Features.js

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaRobot, FaPalette, FaMobileAlt, FaLock } from 'react-icons/fa';

const Features = () => {
  const featureData = [
    {
      icon: <FaRobot size={50} />,
      title: 'AI-Powered Suggestions',
      description: 'Get intelligent website template recommendations tailored to your industry and preferences.',
    },
    {
      icon: <FaPalette size={50} />,
      title: 'Customizable Designs',
      description: 'Easily customize templates to match your brand’s look and feel without any coding.',
    },
    {
      icon: <FaMobileAlt size={50} />,
      title: 'Responsive Layouts',
      description: 'Ensure your website looks great on all devices, from desktops to mobile phones.',
    },
    {
      icon: <FaLock size={50} />,
      title: 'Secure Hosting',
      description: 'Enjoy secure and reliable hosting with robust protection for your website data.',
    },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Why Choose AI Builder?</h2>
      <Row>
        {featureData.map((feature, index) => (
          <Col key={index} xs={12} md={6} lg={3} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div className="mb-3 text-primary">{feature.icon}</div>
                <Card.Title>{feature.title}</Card.Title>
                <Card.Text>{feature.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Features;
 
