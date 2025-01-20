// src/pages/DashboardHome.js

import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const DashboardHome = () => {
  return (
    <div>
      <h2 className="mb-4">Dashboard Overview</h2>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>1,234</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Active Subscriptions</Card.Title>
              <Card.Text>567</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Revenue</Card.Title>
              <Card.Text>$89,012</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add more dashboard widgets or components here */}
    </div>
  );
};

export default DashboardHome;
 
