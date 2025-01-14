// src/components/HowItWorks.js

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaSearch, FaEdit, FaRocket } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch size={40} />,
      title: '1. Choose Your Industry',
      description: 'Select your industry to receive tailored website template suggestions.',
    },
    {
      icon: <FaEdit size={40} />,
      title: '2. Customize Your Template',
      description: 'Easily customize the selected template to match your brand’s identity.',
    },
    {
      icon: <FaRocket size={40} />,
      title: '3. Launch Your Website',
      description: 'Deploy your website with secure hosting and enjoy a stunning online presence.',
    },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">How It Works</h2>
      <Row>
        {steps.map((step, index) => (
          <Col key={index} xs={12} md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div className="mb-3 text-success">{step.icon}</div>
                <Card.Title>{step.title}</Card.Title>
                <Card.Text>{step.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HowItWorks;
 
