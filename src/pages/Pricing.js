// src/pages/Pricing.js

import React, { useState } from 'react';
import { Container, Card, Row, Col, ToggleButtonGroup, ToggleButton, Badge } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import GetStartedButton from '../components/GetStartedButton';
import '../styles/Pricing.css';
import AOS from 'aos';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = {
    monthly: [
      {
        name: 'Starter',
        price: '$15 / mo',
        features: [
          'Single website',
          'Basic customization tools',
          'Standard templates',
          'Email support',
        ],
      },
      {
        name: 'Professional',
        price: '$39 / mo',
        features: [
          '5 websites',
          'Advanced customization options',
          'Premium templates',
          'Analytics and SEO tools',
          'API access',
        ],
        recommended: true,
      },
      {
        name: 'Enterprise',
        price: '$99 / mo',
        features: [
          'Unlimited websites',
          'Full customization',
          'Dedicated account manager',
          'Priority support',
          '24/7 support',
        ],
      },
    ],
    yearly: [
      {
        name: 'Starter',
        price: '$150 / yr',
        features: [
          'Single website',
          'Basic customization tools',
          'Standard templates',
          'Email support',
        ],
      },
      {
        name: 'Professional',
        price: '$390 / yr',
        features: [
          '5 websites',
          'Advanced customization options',
          'Premium templates',
          'Analytics and SEO tools',
          'API access',
        ],
        recommended: true,
      },
      {
        name: 'Enterprise',
        price: '$990 / yr',
        features: [
          'Unlimited websites',
          'Full customization',
          'Dedicated account manager',
          'Priority support',
          '24/7 support',
        ],
      },
    ],
  };

  // Function to handle billing cycle toggle
  const handleBillingCycleChange = (val) => {
    setBillingCycle(val);
  };

  return (
    <Container className="pricing-plans my-5" id="pricing-plans">
      <h2 className="text-center mb-4">Pricing Plans</h2>
      {/* Billing Cycle Toggle */}
      <div className="billing-cycle-switch d-flex justify-content-center mb-4">
        <ToggleButtonGroup
          type="radio"
          name="billingCycle"
          value={billingCycle}
          onChange={handleBillingCycleChange}
        >
          <ToggleButton
            id="monthly"
            value="monthly"
            variant={billingCycle === 'monthly' ? 'primary' : 'outline-primary'}
            aria-pressed={billingCycle === 'monthly'}
            aria-label="Select Monthly Billing Cycle"
          >
            Monthly
          </ToggleButton>
          <ToggleButton
            id="yearly"
            value="yearly"
            variant={billingCycle === 'yearly' ? 'primary' : 'outline-primary'}
            aria-pressed={billingCycle === 'yearly'}
            aria-label="Select Yearly Billing Cycle"
          >
            Yearly
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {/* Pricing Plans */}
      <Row>
        {plans[billingCycle].map((plan, index) => (
          <Col
            key={index}
            xs={12}
            md={4}
            className="mb-4"
            data-aos="fade-up"
            data-aos-delay={index * 100} // Staggered animation delay
          >
            <div className="plan-card-wrapper">
              <Card className={`h-100 text-center plan-card ${plan.recommended ? 'recommended' : ''}`}>
                {plan.recommended && (
                  <Badge bg="warning" text="dark" className="recommended-badge">
                    Recommended
                  </Badge>
                )}
                <Card.Body>
                  <Card.Title className="plan-name">{plan.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted plan-price">{plan.price}</Card.Subtitle>
                  <ul className="plan-features list-unstyled">
                    {plan.features.map((feature, i) => (
                      <li key={i}>
                        <FaCheck className="text-success me-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <GetStartedButton text="Get Started" to="/get-started" />
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Pricing;
