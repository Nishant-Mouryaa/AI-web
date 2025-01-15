// src/components/Gallery.js

import React from 'react';
import { Container, Row, Col, Card, Modal, Button, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { FaSearchPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Gallery.css';

const Gallery = () => {
  const galleryItems = [
    {
      title: 'E-Commerce Store',
      image: 'https://i.postimg.cc/4dLJ4KQ2/banner.png',
      description: 'A sleek and modern online store for fashion products.',
      story: 'Jane Doe increased her sales by 150% using our E-Commerce templates.',
      category: 'E-Commerce',
    },
    {
      title: 'Personal Blog',
      image: 'https://i.postimg.cc/Xq94f20m/The-Blog.png',
      description: 'A clean and minimalist blog template for personal writing.',
      story: 'John Smith shares his journey and insights effortlessly with our blog templates.',
      category: 'Blog',
    },
    {
      title: 'Corporate Website',
      image: 'https://i.postimg.cc/LX1pSyh5/Header.png',
      description: 'A professional corporate website with integrated services.',
      story: 'Emily Johnson showcases her design portfolio with our corporate templates.',
      category: 'Corporate',
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

  // Optional: Filter functionality
  const categories = ['All', 'E-Commerce', 'Blog', 'Corporate'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredGalleryItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <Container className="my-5 gallery-section" id="gallery">
      <h2 className="text-center mb-4">Our Portfolio</h2>

      {/* Category Filters */}
      <div className="category-filters text-center mb-4">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={activeCategory === category ? 'primary' : 'outline-primary'}
            className="me-2 mb-2"
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            aria-label={`Filter by ${category}`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <Row>
        {filteredGalleryItems.map((item, index) => (
          <Col
            key={index}
            xs={12}
            md={6}
            lg={4}
            className="mb-4"
            data-aos="zoom-in"
            data-aos-delay={index * 100} // Staggered animation delay
          >
            <motion.div
              className="gallery-card-wrapper"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className="gallery-card"
                onClick={() => handleShow(item)}
                tabIndex="0"
                role="button"
                aria-label={`View details of ${item.title}`}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleShow(item);
                }}
              >
                <div className="image-container">
                  <LazyLoadImage
                    src={item.image}
                    alt={item.title}
                    className="card-img-top gallery-image"
                    effect="blur"
                  />
                  <div className="overlay">
                    <FaSearchPlus className="overlay-icon" />
                  </div>
                </div>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Modal for Full-Size Image */}
      {currentItem && (
        <Modal
          show={show}
          onHide={handleClose}
          centered
          size="lg"
          aria-labelledby="gallery-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="gallery-modal-title">{currentItem.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={currentItem.image}
              alt={`${currentItem.title} full view`}
              className="img-fluid mb-3 modal-image"
            />
            <p>{currentItem.description}</p>
            {currentItem.story && (
              <p>
                <strong>Case Study:</strong> {currentItem.story}
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* Optional: Add a button to view the live site or contact */}
            {/* <Button variant="primary" href="/contact">
              Contact Us
            </Button> */}
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Gallery;
