// src/components/Dashboard/DescriptionSection.js

import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';

const DescriptionSection = ({ description, updateDescription }) => {
  const [show, setShow] = useState(false);
  const [currentDescription, setCurrentDescription] = useState(description);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setCurrentDescription(e.target.value);
  };

  const handleSave = () => {
    updateDescription(currentDescription);
    handleClose();
  };

  return (
    <>
      <Card className="mb-4">
        <Card.Header>Description</Card.Header>
        <Card.Body>
          <Card.Text>{description}</Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Edit Description
          </Button>
        </Card.Body>
      </Card>

      {/* Edit Description Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDescription">
              <Form.Label>Platform Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentDescription}
                onChange={handleChange}
                placeholder="Enter your description here..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Description
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DescriptionSection;
 
