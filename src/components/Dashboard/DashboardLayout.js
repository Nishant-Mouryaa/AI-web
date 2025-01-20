// src/components/Dashboard/DashboardLayout.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DashboardSidebar from './Sidebar'; // Ensure correct path
import './DashboardLayout.css'; // Custom CSS for layout

const DashboardLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={3} lg={2} className="p-0">
          <DashboardSidebar />
        </Col>
        <Col xs={12} md={9} lg={10} className="py-4 main-content-col">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;
