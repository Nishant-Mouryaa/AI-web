// src/components/HeroSection.js

import React from 'react';

const HeroSection = ({ title, subtitle, backgroundImage }) => {
  const heroStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '100px 0',
    color: '#333',
    textAlign: 'center',
  };

  return (
    <section style={heroStyle} className="d-flex align-items-center justify-content-center">
      <div className="container">
        <h1 className="display-4">{title}</h1>
        {subtitle && <p className="lead">{subtitle}</p>}
      </div>
    </section>
  );
};

export default HeroSection;
 
