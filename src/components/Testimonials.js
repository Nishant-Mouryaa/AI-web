// src/components/Testimonials.js

import React from 'react';
import { Container, Carousel, Card } from 'react-bootstrap';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Jane Doe',
      role: 'Entrepreneur',
      photo: 'https://via.placeholder.com/100',
      quote: 'AI Builder transformed my business website effortlessly. Highly recommended!',
    },
    {
      name: 'John Smith',
      role: 'Blogger',
      photo: 'https://via.placeholder.com/100',
      quote: 'The AI-driven suggestions made designing my blog a breeze.',
    },
    {
      name: 'Emily Johnson',
      role: 'Designer',
      photo: 'https://via.placeholder.com/100',
      quote: 'I love how customizable the templates are. Perfect for my clients!',
    },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">What Our Users Say</h2>
      <Carousel>
        {testimonials.map((testimonial, index) => (
          <Carousel.Item key={index}>
            <Card className="text-center">
              <Card.Body>
                <img
                  src={testimonial.photo}
                  alt={`${testimonial.name}'s photo`}
                  className="rounded-circle mb-3"
                  width="100"
                  height="100"
                />
                <Card.Title>{testimonial.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{testimonial.role}</Card.Subtitle>
                <Card.Text>"{testimonial.quote}"</Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Testimonials;
 
