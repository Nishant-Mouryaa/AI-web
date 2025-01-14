// src/components/HowItWorks.js

import React, { useState } from 'react';
import { Container, Row, Col, Card, Collapse, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaSearch, FaEdit, FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Optional for advanced animations
import './HowItWorks.css'; // Import custom CSS for additional styling

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch size={40} />,
      title: '1. Choose Your Industry',
      description: 'Select your industry to receive tailored website template suggestions.',
      moreInfo: 'Our AI analyzes your business sector to recommend the most suitable templates that align with your goals.',
    },
    {
      icon: <FaEdit size={40} />,
      title: '2. Customize Your Template',
      description: 'Easily customize the selected template to match your brand’s identity.',
      moreInfo: 'Modify colors, fonts, layouts, and more with our intuitive design tools without any coding knowledge.',
    },
    {
      icon: <FaRocket size={40} />,
      title: '3. Launch Your Website',
      description: 'Deploy your website with secure hosting and enjoy a stunning online presence.',
      moreInfo: 'Publish your site effortlessly and ensure it remains fast, secure, and accessible to your audience.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleCollapse = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  // Optional: Framer Motion variants for advanced animations
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">How It Works</h2>
      <Row>
        {steps.map((step, index) => (
          <Col
            key={index}
            xs={12}
            md={4}
            className="mb-4"
            data-aos="fade-up"
            data-aos-delay={index * 100} // Staggered animation delay
          >
            {/* Optional: Using Framer Motion for additional animations */}
            <motion.div
              className="h-100 text-center howitworks-card-wrapper"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover="hover"
            >
              <Card
                className="h-100 text-center howitworks-card"
                onClick={() => toggleCollapse(index)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') toggleCollapse(index);
                }}
                tabIndex="0"
                aria-expanded={openIndex === index}
                aria-controls={`howitworks-collapse-${index}`}
                aria-label={`${step.title}. Click to read more`}
                role="button"
              >
                <Card.Body>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-icon-${index}`}>{step.title}</Tooltip>}
                  >
                    <div className="mb-3 text-success howitworks-icon">{step.icon}</div>
                  </OverlayTrigger>
                  <Card.Title>{step.title}</Card.Title>
                  <Card.Text>{step.description}</Card.Text>
                  <Collapse in={openIndex === index}>
                    <div id={`howitworks-collapse-${index}`} className="more-info">
                      <p>{step.moreInfo}</p>
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HowItWorks;
