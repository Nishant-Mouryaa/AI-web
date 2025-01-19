// src/components/Dashboard/DashboardLayout.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DashboardNavbar from './Navbar';
import DashboardSidebar from './Sidebar';
import './DashboardLayout.css'; // Custom CSS for layout

const DashboardLayout = ({ children }) => {
  return (
    <>
      <DashboardNavbar />
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col xs={12} md={3} lg={2} className="bg-light vh-100 sidebar-col">
            <DashboardSidebar />
          </Col>

          {/* Main Content */}
          <Col xs={12} md={9} lg={10} className="py-4 main-content-col">
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashboardLayout;
