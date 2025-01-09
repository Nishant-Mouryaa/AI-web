// src/components/Dashboard/WebsitePreferences.js

import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';

const WebsitePreferences = ({ preferences, updatePreferences }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(preferences);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    updatePreferences(formData);
    handleClose();
  };

  return (
    <>
      <Card className="mb-4">
        <Card.Header>Website Preferences</Card.Header>
        <Card.Body>
          <Card.Title>Theme</Card.Title>
          <Card.Text>{preferences.theme}</Card.Text>

          <Card.Title>Layout</Card.Title>
          <Card.Text>{preferences.layout}</Card.Text>

          <Card.Title>Color Scheme</Card.Title>
          <Card.Text>{preferences.colorScheme}</Card.Text>

          <Button variant="primary" onClick={handleShow}>
            Edit Preferences
          </Button>
        </Card.Body>
      </Card>

      {/* Edit Preferences Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Website Preferences</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTheme" className="mb-3">
              <Form.Label>Theme</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter theme"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formLayout" className="mb-3">
              <Form.Label>Layout</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter layout"
                name="layout"
                value={formData.layout}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formColorScheme" className="mb-3">
              <Form.Label>Color Scheme</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter color scheme"
                name="colorScheme"
                value={formData.colorScheme}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WebsitePreferences;
 
