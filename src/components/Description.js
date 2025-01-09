// src/components/Description.js

import React from 'react';

const Description = ({ text }) => {
  return (
    <section className="py-5">
      <div className="container">
        <p className="lead">{text}</p>
      </div>
    </section>
  );
};

export default Description;
 
