// src/components/Dashboard/Sidebar.js

import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardSidebar = () => {
  return (
    <Nav className="flex-column p-3">
      <Nav.Link as={Link} to="/dashboard">
        Overview
      </Nav.Link>
      <Nav.Link as={Link} to="/dashboard/settings">
        Settings
      </Nav.Link>
      <Nav.Link as={Link} to="/dashboard/templates">
        Templates
      </Nav.Link>
      {/* Add more navigation links as needed */}
    </Nav>
  );
};

export default DashboardSidebar;
