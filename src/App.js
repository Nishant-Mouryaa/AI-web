// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import Home from './pages/Home';
import PricingPage from './pages/Pricing';
import FAQPage from './pages/FAQ';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SettingsProfile from './pages/SettingsProfile';
import SettingsAccount from './pages/SettingsAccount';
import Help from './pages/Help';
import ProtectedRoute from './components/ProtectedRoute';
import GetStarted from './pages/GetStarted';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboard Route with Nested Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes */}
          <Route index element={<DashboardHome />} /> {/* /dashboard */}
          <Route path="profile" element={<Profile />} /> {/* /dashboard/profile */}
          <Route path="settings">
            <Route path="profile" element={<SettingsProfile />} /> {/* /dashboard/settings/profile */}
            <Route path="account" element={<SettingsAccount />} /> {/* /dashboard/settings/account */}
          </Route>
          <Route path="help" element={<Help />} /> {/* /dashboard/help */}
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

// Dashboard Home Component (Represents /dashboard)
const DashboardHome = () => {
  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      {/* Add dashboard-specific content here */}
    </div>
  );
};

export default App;
