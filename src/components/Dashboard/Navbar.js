// src/components/Dashboard/Navbar.js

import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Navbar.css'; // Custom CSS for navbar

const DashboardNavbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to Home or Login
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container fluid>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar.Brand href="/dashboard">AI Builder Dashboard</Navbar.Brand>
        </motion.div>
        <Navbar.Toggle aria-controls="dashboard-navbar-nav" />
        <Navbar.Collapse id="dashboard-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FaUserCircle size={24} className="me-2" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </motion.div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;
