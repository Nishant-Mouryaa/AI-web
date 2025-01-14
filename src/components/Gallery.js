// src/components/Gallery.js

import React from 'react';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

const Gallery = () => {
  const galleryItems = [
    {
      title: 'E-Commerce Store',
      image: 'https://via.placeholder.com/300x200.png?text=E-Commerce+Store',
      description: 'A sleek and modern online store for fashion products.',
    },
    {
      title: 'Personal Blog',
      image: 'https://via.placeholder.com/300x200.png?text=Personal+Blog',
      description: 'A clean and minimalist blog template for personal writing.',
    },
    {
      title: 'Corporate Website',
      image: 'https://via.placeholder.com/300x200.png?text=Corporate+Website',
      description: 'A professional corporate website with integrated services.',
    },
    // Add more gallery items as needed
  ];

  const [show, setShow] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleShow = (item) => {
    setCurrentItem(item);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setCurrentItem(null);
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Our Portfolio</h2>
      <Row>
        {galleryItems.map((item, index) => (
          <Col key={index} xs={12} md={6} lg={4} className="mb-4">
            <Card onClick={() => handleShow(item)} style={{ cursor: 'pointer' }}>
              <Card.Img variant="top" src={item.image} alt={item.title} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Full-Size Image */}
      {currentItem && (
        <Modal show={show} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{currentItem.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="img-fluid mb-3"
            />
            <p>{currentItem.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Gallery;
 
