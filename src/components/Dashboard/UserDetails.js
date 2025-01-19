// src/components/Dashboard/UserDetails.js

import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const UserDetails = ({ email, name, updateUserDetails, handleLogout }) => {
  const [newName, setNewName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim() === '') return;
    updateUserDetails(newName);
    setIsEditing(false);
  };

  return (
    <div className="mb-4">
      <h4>User Details</h4>
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-center">
          <Col xs={12} md={4}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" value={email} readOnly />
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                readOnly={!isEditing}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={4} className="mt-3 mt-md-0">
            {!isEditing ? (
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Edit Name
              </Button>
            ) : (
              <>
                <Button type="submit" variant="success" className="me-2">
                  Save
                </Button>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Form>
      <Button variant="danger" className="mt-3" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

UserDetails.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default UserDetails;
