// src/components/GetStartedButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router

const GetStartedButton = ({ text, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button className="btn btn-primary btn-lg" onClick={handleClick}>
      {text}
    </button>
  );
};

export default GetStartedButton;
 
