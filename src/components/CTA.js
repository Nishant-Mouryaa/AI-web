// src/components/CTA.js

import React from 'react';
import { Container, Button } from 'react-bootstrap';

const CTA = () => {
  return (
    <Container className="text-center my-5">
      <h2>Ready to Build Your Dream Website?</h2>
      <p className="mb-4">Join thousands of satisfied users and create your website effortlessly.</p>
      <Button variant="success" size="lg" href="/get-started">
        Get Started Now
      </Button>
    </Container>
  );
};

export default CTA;
 
