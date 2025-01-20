// src/pages/Dashboard.js

import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from '../components/Dashboard/DashboardLayout';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default Dashboard;
