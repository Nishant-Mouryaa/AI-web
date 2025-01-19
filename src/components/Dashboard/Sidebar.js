// src/components/Dashboard/Sidebar.js

import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaQuestionCircle } from 'react-icons/fa';
import './Sidebar.css'; // Custom CSS for sidebar

const DashboardSidebar = () => {
  return (
    <Nav defaultActiveKey="/dashboard" className="flex-column p-3">
      <NavLink to="/dashboard" className="nav-link">
        <FaHome className="me-2" />
        Home
      </NavLink>
      <NavLink to="/dashboard/profile" className="nav-link">
        <FaUser className="me-2" />
        Profile
      </NavLink>
      <NavLink to="/dashboard/settings" className="nav-link">
        <FaCog className="me-2" />
        Settings
      </NavLink>
      <NavLink to="/dashboard/help" className="nav-link">
        <FaQuestionCircle className="me-2" />
        Help
      </NavLink>
    </Nav>
  );
};

export default DashboardSidebar;
