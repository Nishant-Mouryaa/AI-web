// src/components/Dashboard/WebsitePreferences.js

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const WebsitePreferences = ({ preferences, updatePreferences }) => {
  const [theme, setTheme] = useState(preferences.theme || 'light');
  const [notifications, setNotifications] = useState(
    preferences.notifications || false
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePreferences({ theme, notifications });
  };

  return (
    <div className="mb-4">
      <h4>Website Preferences</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTheme" className="mb-3">
          <Form.Label>Theme</Form.Label>
          <Form.Select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formNotifications" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Enable Notifications"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Save Preferences
        </Button>
      </Form>
    </div>
  );
};

WebsitePreferences.propTypes = {
  preferences: PropTypes.shape({
    theme: PropTypes.string,
    notifications: PropTypes.bool,
  }).isRequired,
  updatePreferences: PropTypes.func.isRequired,
};

export default WebsitePreferences;
