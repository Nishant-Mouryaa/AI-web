// src/components/Pricing.js

import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$9.99/mo',
      features: ['Access to basic templates', 'AI-powered suggestions', 'Email support'],
      isPopular: false,
    },
    {
      name: 'Pro',
      price: '$29.99/mo',
      features: [
        'All Basic features',
        'Unlimited template customization',
        'Priority email support',
        'Advanced analytics',
      ],
      isPopular: true,
    },
    {
      name: 'Enterprise',
      price: '$99.99/mo',
      features: [
        'All Pro features',
        'Dedicated account manager',
        'Custom integrations',
        '24/7 phone support',
      ],
      isPopular: false,
    },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Pricing Plans</h2>
      <Row>
        {plans.map((plan, index) => (
          <Col key={index} xs={12} md={4} className="mb-4">
            <Card className={`h-100 ${plan.isPopular ? 'border-primary' : ''}`}>
              {plan.isPopular && (
                <Card.Header className="bg-primary text-white text-center">
                  Most Popular
                </Card.Header>
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center">{plan.name}</Card.Title>
                <h3 className="text-center my-3">{plan.price}</h3>
                <ul className="list-unstyled mb-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
                <Button variant={plan.isPopular ? 'primary' : 'outline-primary'} className="mt-auto">
                  {plan.isPopular ? 'Choose Plan' : 'Choose Plan'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Pricing;
 
