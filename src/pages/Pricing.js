// src/pages/Pricing.js

import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$9.99/month',
      features: ['Access to basic templates', 'Email support', '1 project'],
    },
    {
      name: 'Pro',
      price: '$19.99/month',
      features: ['All Basic features', 'Priority support', '5 projects', 'Advanced analytics'],
    },
    {
      name: 'Enterprise',
      price: '$49.99/month',
      features: [
        'All Pro features',
        'Dedicated support',
        'Unlimited projects',
        'Custom integrations',
      ],
    },
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Pricing Plans</h2>
      <Row>
        {plans.map((plan, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{plan.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{plan.price}</Card.Subtitle>
                <ul>
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <Button variant="primary">Choose Plan</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Pricing;
 
