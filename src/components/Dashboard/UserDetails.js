// src/components/Dashboard/UserDetails.js

import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './UserDetails.css'; // Custom CSS for UserDetails

const UserDetails = ({ email, name, updateUserDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleSave = () => {
    if (newName.trim() !== '') {
      updateUserDetails(newName);
      setIsEditing(false);
    }
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header>User Details</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value={email} readOnly />
          </Form.Group>

          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label>
            {isEditing ? (
              <Form.Control
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter your name"
              />
            ) : (
              <Form.Control type="text" value={name} readOnly />
            )}
          </Form.Group>

          <Button
            variant={isEditing ? 'success' : 'primary'}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>

          {isEditing && (
            <Button variant="secondary" className="ms-2" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

UserDetails.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
};

export default React.memo(UserDetails);
