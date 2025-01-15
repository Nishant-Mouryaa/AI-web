// src/components/GetStartedButton.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './GetStartedButton.css';

const GetStartedButton = ({
  text,
  to,
  variant = 'primary',
  size = 'lg',
  disabled = false,
  className = '',
  style = {},
  icon = true,
  ...props
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (isLoading || disabled) return;
    setIsLoading(true);
    navigate(to);
    // Optionally, handle post-navigation actions here
    // e.g., set a timeout to reset loading state if needed
    setTimeout(() => setIsLoading(false), 500); // Example: Reset after 500ms
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`get-started-button ${className}`}
      style={style}
      {...props}
    >
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        disabled={isLoading || disabled}
        aria-label={text}
        className="d-flex align-items-center"
      >
        {isLoading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
            Loading...
          </>
        ) : (
          <>
            {text}
            {icon && <FaArrowRight className="ms-2 arrow-icon" />}
          </>
        )}
      </Button>
    </motion.div>
  );
};

GetStartedButton.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  variant: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg', '']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.bool,
};

export default React.memo(GetStartedButton);
