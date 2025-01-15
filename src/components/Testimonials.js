// src/components/Testimonials.js

import React from 'react';
import { Container, Carousel, Card, Row, Col } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Optional for advanced animations
import './Testimonials.css'; // Import custom CSS for additional styling

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Jane Doe',
      role: 'Entrepreneur',
      photo: 'https://i.postimg.cc/JhmWc727/DALL-E-2025-01-15-23-43-34-A-single-person-smiling-confidently-ideal-for-a-testimonial-page-The.webp',
      quote: 'AI Builder transformed my business website effortlessly. Highly recommended!',
      rating: 5,
    },
    {
      name: 'John Smith',
      role: 'Blogger',
      photo: 'https://i.postimg.cc/qRN0gbF2/DALL-E-2025-01-15-23-49-05-A-single-male-person-smiling-confidently-ideal-for-a-testimonial-page.webp',
      quote: 'The AI-driven suggestions made designing my blog a breeze.',
      rating: 4.5,
    },
    {
      name: 'Emily Johnson',
      role: 'Designer',
      photo: 'https://i.postimg.cc/Fzttz93Q/DALL-E-2025-01-15-23-49-55-A-single-female-person-smiling-confidently-ideal-for-a-testimonial-pag.webp',
      quote: 'I love how customizable the templates are. Perfect for my clients!',
      rating: 4,
    },
  ];

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} color="#ffc107" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" color="#ffc107" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} color="#ffc107" />);
    }

    return stars;
  };

  return (
    <Container className="my-5" data-aos="fade-up">
      <h2 className="text-center mb-4">What Our Users Say</h2>
      <Row className="justify-content-center">
        {testimonials.map((testimonial, index) => (
          <Col
            key={index}
            xs={12}
            md={6}
            lg={4}
            className="mb-4"
          >
            <motion.div
              className="testimonial-card-wrapper"
              whileHover={{ scale: 1.05, boxShadow: '0px 4px 20px rgba(0,0,0,0.2)' }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-100 text-center testimonial-card">
                <Card.Body>
                  <img
                    src={testimonial.photo}
                    alt={`${testimonial.name}'s photo`}
                    className="rounded-circle mb-3 testimonial-photo"
                    width="100"
                    height="100"
                    loading="lazy"
                  />
                  <Card.Title>{testimonial.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{testimonial.role}</Card.Subtitle>
                  <div className="testimonial-rating mb-2">
                    {renderStars(testimonial.rating)}
                  </div>
                  <Card.Text className="testimonial-quote">"{testimonial.quote}"</Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Testimonials;
