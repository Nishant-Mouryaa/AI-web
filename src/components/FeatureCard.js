// src/components/FeatureCard.js

import React, { useState } from 'react';
import { Card, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import './FeatureCard.css'; // Import custom CSS for FeatureCard

const FeatureCard = ({ icon, title, description, moreInfo, delay }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      className="feature-card-wrapper"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' }}
    >
      <Card
        className="h-100 text-center feature-card"
        onClick={toggleCollapse}
        onKeyPress={(e) => {
          if (e.key === 'Enter') toggleCollapse();
        }}
        tabIndex="0"
        aria-expanded={isOpen}
        aria-controls={`feature-collapse-${title}`}
        aria-label={`${title}. Click to read more`}
        role="button"
      >
        <Card.Body>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`tooltip-${title}`}>{title}</Tooltip>}
          >
            <div className="mb-3 text-primary feature-icon">{icon}</div>
          </OverlayTrigger>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id={`feature-collapse-${title}`}
                className="more-info"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p>{moreInfo}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

FeatureCard.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  moreInfo: PropTypes.string.isRequired,
  delay: PropTypes.number,
};

FeatureCard.defaultProps = {
  delay: 0,
};

export default React.memo(FeatureCard);
