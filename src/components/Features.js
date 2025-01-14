// src/components/Features.js

import React, { useState } from 'react';
import { Container, Row, Col, Card, Collapse, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaRobot, FaPalette, FaMobileAlt, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Features.css'; // Import custom CSS for additional styling

const Features = () => {
  const featureData = [
    {
      icon: <FaRobot size={50} />,
      title: 'AI-Powered Suggestions',
      description: 'Get intelligent website template recommendations tailored to your industry and preferences.',
      moreInfo: 'Our AI analyzes your business needs to suggest the best templates that align with your goals.',
    },
    {
      icon: <FaPalette size={50} />,
      title: 'Customizable Designs',
      description: 'Easily customize templates to match your brand’s look and feel without any coding.',
      moreInfo: 'Modify colors, fonts, layouts, and more with our intuitive design tools.',
    },
    {
      icon: <FaMobileAlt size={50} />,
      title: 'Responsive Layouts',
      description: 'Ensure your website looks great on all devices, from desktops to mobile phones.',
      moreInfo: 'Our templates are built to be fully responsive, providing a seamless experience across all devices.',
    },
    {
      icon: <FaLock size={50} />,
      title: 'Secure Hosting',
      description: 'Enjoy secure and reliable hosting with robust protection for your website data.',
      moreInfo: 'We prioritize your security with advanced measures to keep your website safe and online.',
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Why Choose AI Builder?</h2>
      <Row>
        {featureData.map((feature, index) => (
          <Col
            key={index}
            xs={12}
            md={6}
            lg={3}
            className="mb-4"
            data-aos="fade-up"
            data-aos-delay={index * 100} // Staggered animation delay
          >
            <motion.div
              className="h-100 text-center feature-card-wrapper"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover="hover"
            >
              <Card
                className="h-100 text-center feature-card"
                onClick={() => toggleCollapse(index)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') toggleCollapse(index);
                }}
                tabIndex="0"
                aria-expanded={openIndex === index}
                aria-controls={`feature-collapse-${index}`}
                aria-label={`${feature.title}. Click to read more`}
                role="button"
              >
                <Card.Body>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-icon-${index}`}>{feature.title}</Tooltip>}
                  >
                    <div className="mb-3 text-primary feature-icon">{feature.icon}</div>
                  </OverlayTrigger>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.description}</Card.Text>
                  <Collapse in={openIndex === index}>
                    <div id={`feature-collapse-${index}`} className="more-info">
                      <p>{feature.moreInfo}</p>
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

export default Features;
