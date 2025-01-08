// src/pages/Home.js

import React from 'react';
import { Container, Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="mt-4">
      <div className="p-5 mb-4 bg-light rounded-3">
        <h1 className="display-5 fw-bold">Welcome to AI Builder</h1>
        <p className="col-md-8 fs-4">
          Build and customize your website effortlessly with our intuitive templates and tools.
        </p>
        <Link to="/signup">
          <Button variant="primary" size="lg">
            Get Started
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Home;
 
