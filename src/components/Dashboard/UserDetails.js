// src/components/Dashboard/UserDetails.js

import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';

const UserDetails = ({ email, name, updateUserDetails }) => {
  const [show, setShow] = useState(false);
  const [currentName, setCurrentName] = useState(name);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setCurrentName(e.target.value);
  };

  const handleSave = () => {
    updateUserDetails(currentName);
    handleClose();
  };

  return (
    <>
      <Card className="mb-4">
        <Card.Header>User Details</Card.Header>
        <Card.Body>
          <Card.Title>Name</Card.Title>
          <Card.Text>{name}</Card.Text>

          <Card.Title>Email</Card.Title>
          <Card.Text>{email}</Card.Text>

          <Button variant="primary" onClick={handleShow}>
            Edit Name
          </Button>
        </Card.Body>
      </Card>

      {/* Edit Name Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={currentName}
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
            Save Name
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserDetails;
