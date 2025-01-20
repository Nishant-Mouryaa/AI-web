// src/pages/Help.js

import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

const Help = () => {
  return (
    <>
      <h2 className="mb-4">Help & Support</h2>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>How to use the Dashboard?</Accordion.Header>
          <Accordion.Body>
            <p>
              The dashboard provides an overview of your application's performance, user data, and settings. Use the sidebar to navigate between different sections such as Profile, Settings, and Help.
            </p>
            {/* Add more detailed instructions as needed */}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How to update my profile?</Accordion.Header>
          <Accordion.Body>
            <p>
              Navigate to the <strong>Profile</strong> section using the sidebar. Here, you can view and update your personal information.
            </p>
            {/* Add more detailed instructions as needed */}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>How to change my password?</Accordion.Header>
          <Accordion.Body>
            <p>
              Go to <strong>Settings</strong> in the sidebar, then select <strong>Account Settings</strong>. Here, you can update your password securely.
            </p>
            {/* Add more detailed instructions as needed */}
          </Accordion.Body>
        </Accordion.Item>
        {/* Add more FAQs or help topics as needed */}
      </Accordion>
    </>
  );
};

export default Help;
 
