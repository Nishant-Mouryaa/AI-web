// src/components/Dashboard/DescriptionSection.js

import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './DescriptionSection.css'; // Custom CSS for DescriptionSection

const DescriptionSection = ({ description, updateDescription }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(description);

  const handleSave = () => {
    if (newDescription.trim() !== '') {
      updateDescription(newDescription);
      setIsEditing(false);
    }
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header>Description</Card.Header>
      <Card.Body>
        <Form>
          {isEditing ? (
            <>
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label>Website Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Enter your website description"
                />
              </Form.Group>
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
              <Button variant="secondary" className="ms-2" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label>Website Description</Form.Label>
                <Form.Control as="textarea" rows={4} value={description} readOnly />
              </Form.Group>
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Edit Description
              </Button>
            </>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

DescriptionSection.propTypes = {
  description: PropTypes.string.isRequired,
  updateDescription: PropTypes.func.isRequired,
};

export default React.memo(DescriptionSection);
