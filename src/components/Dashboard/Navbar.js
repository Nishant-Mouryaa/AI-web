// src/components/Dashboard/Navbar.js

import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardNavbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/">AI Builder</Navbar.Brand>
        <Navbar.Toggle aria-controls="dashboard-navbar-nav" />
        <Navbar.Collapse id="dashboard-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            {/* Add more Nav links as needed */}
            <Button variant="outline-danger" className="ms-3" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;
 
