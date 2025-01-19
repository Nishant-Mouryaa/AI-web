// src/components/Dashboard/DescriptionSection.js

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DescriptionSection = ({ description, updateDescription }) => {
  const [newDescription, setNewDescription] = useState(description);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newDescription.trim() === '') return;
    updateDescription(newDescription);
    setIsEditing(false);
  };

  return (
    <div className="mb-4">
      <h4>Website Description</h4>
      {!isEditing ? (
        <div>
          <p>{description}</p>
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            Edit Description
          </Button>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="success" className="me-2">
            Save
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </Form>
      )}
    </div>
  );
};

DescriptionSection.propTypes = {
  description: PropTypes.string.isRequired,
  updateDescription: PropTypes.func.isRequired,
};

export default DescriptionSection;
