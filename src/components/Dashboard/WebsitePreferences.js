// src/components/Dashboard/WebsitePreferences.js

import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './WebsitePreferences.css'; // Custom CSS for WebsitePreferences

const WebsitePreferences = ({ preferences, updatePreferences }) => {
  const [theme, setTheme] = useState(preferences.theme);
  const [layout, setLayout] = useState(preferences.layout);
  const [notifications, setNotifications] = useState(preferences.notifications);

  const handleSave = () => {
    const newPreferences = { theme, layout, notifications };
    updatePreferences(newPreferences);
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header>Website Preferences</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group controlId="formTheme" className="mb-3">
            <Form.Label>Theme</Form.Label>
            <Form.Select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="solarized">Solarized</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formLayout" className="mb-3">
            <Form.Label>Layout</Form.Label>
            <Form.Select value={layout} onChange={(e) => setLayout(e.target.value)}>
              <option value="single-column">Single Column</option>
              <option value="double-column">Double Column</option>
              <option value="grid">Grid</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formNotifications" className="mb-3">
            <Form.Check
              type="switch"
              label="Enable Notifications"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSave}>
            Save Preferences
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

WebsitePreferences.propTypes = {
  preferences: PropTypes.shape({
    theme: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired,
    notifications: PropTypes.bool.isRequired,
  }).isRequired,
  updatePreferences: PropTypes.func.isRequired,
};

export default React.memo(WebsitePreferences);
