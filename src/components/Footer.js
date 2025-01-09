// src/components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4">
        <p>&copy; {new Date().getFullYear()} AI Builder. All rights reserved.</p>
        {/* Add more footer content as needed */}
      </div>
    </footer>
  );
};

export default Footer;
 
