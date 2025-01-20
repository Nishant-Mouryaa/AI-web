// src/components/Dashboard/DashboardSidebar.js

import React, { useState, useEffect } from 'react';
import { Nav, Button, Collapse, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDown,
  FaAngleUp,
  FaUserCog,
  FaLock,
} from 'react-icons/fa';
import './DashboardSidebar.css'; // Custom CSS for sidebar

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Automatically collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize(); // Set initial state

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleSubmenu = () => {
    setOpenSubmenu(!openSubmenu);
  };

  const renderTooltip = (message) => (
    <Tooltip id={`tooltip-${message}`}>
      {message}
    </Tooltip>
  );

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear tokens and redirect to login
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header d-flex align-items-center justify-content-between p-3">
        {!collapsed && <h4>AI Builder</h4>}
        <Button
          variant="link"
          onClick={toggleSidebar}
          className="text-white"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </Button>
      </div>
      <Nav className="flex-column">
        <OverlayTrigger
          placement="right"
          overlay={renderTooltip('Home')}
        >
          <NavLink
            to="/dashboard"
            className={`nav-link d-flex align-items-center ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            <FaHome className="me-2" />
            {!collapsed && 'Home'}
          </NavLink>
        </OverlayTrigger>

        <OverlayTrigger
          placement="right"
          overlay={renderTooltip('Profile')}
        >
          <NavLink
            to="/dashboard/profile"
            className={`nav-link d-flex align-items-center ${location.pathname === '/dashboard/profile' ? 'active' : ''}`}
          >
            <FaUser className="me-2" />
            {!collapsed && 'Profile'}
          </NavLink>
        </OverlayTrigger>

        {/* Submenu Example */}
        <div className="submenu">
          <OverlayTrigger
            placement="right"
            overlay={renderTooltip('Settings')}
          >
            <Button
              variant="link"
              onClick={toggleSubmenu}
              className="nav-link d-flex align-items-center justify-content-between"
              aria-expanded={openSubmenu}
            >
              <div className="d-flex align-items-center">
                <FaCog className="me-2" />
                {!collapsed && 'Settings'}
              </div>
              {!collapsed && (openSubmenu ? <FaAngleUp /> : <FaAngleDown />)}
            </Button>
          </OverlayTrigger>
          <Collapse in={openSubmenu}>
            <div>
              <OverlayTrigger
                placement="right"
                overlay={renderTooltip('Profile Settings')}
              >
                <NavLink
                  to="/dashboard/settings/profile"
                  className={`nav-link ms-4 d-flex align-items-center ${location.pathname === '/dashboard/settings/profile' ? 'active' : ''}`}
                >
                  <FaUserCog className="me-2" />
                  {!collapsed && 'Profile Settings'}
                </NavLink>
              </OverlayTrigger>
              <OverlayTrigger
                placement="right"
                overlay={renderTooltip('Account Settings')}
              >
                <NavLink
                  to="/dashboard/settings/account"
                  className={`nav-link ms-4 d-flex align-items-center ${location.pathname === '/dashboard/settings/account' ? 'active' : ''}`}
                >
                  <FaLock className="me-2" />
                  {!collapsed && 'Account Settings'}
                </NavLink>
              </OverlayTrigger>
            </div>
          </Collapse>
        </div>

        <OverlayTrigger
          placement="right"
          overlay={renderTooltip('Help')}
        >
          <NavLink
            to="/dashboard/help"
            className={`nav-link d-flex align-items-center ${location.pathname === '/dashboard/help' ? 'active' : ''}`}
          >
            <FaQuestionCircle className="me-2" />
            {!collapsed && 'Help'}
          </NavLink>
        </OverlayTrigger>
      </Nav>
      {/* User Profile Section */}
      <div className="user-profile p-3 mt-auto">
        <div className="d-flex align-items-center">
          <div className="user-avatar me-2">
            {/* Replace with user avatar */}
            <img
              src="/path-to-avatar.png"
              alt="User Avatar"
              className="img-fluid rounded-circle"
            />
          </div>
          {!collapsed && <span className="user-name">John Doe</span>}
        </div>
        {!collapsed && (
          <>
            <Button
              variant="outline-light"
              size="sm"
              className="mt-2 w-100"
              onClick={() => { navigate('/dashboard/profile'); }}
            >
              View Profile
            </Button>
            <Button
              variant="outline-light"
              size="sm"
              className="mt-2 w-100"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
