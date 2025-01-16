// src/pages/Pricing.js

import { Container, Card, Row, Col, ToggleButtonGroup, ToggleButton, Badge } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import GetStartedButton from '../components/GetStartedButton';
import HeroSection from '../components/HeroSection';
import React, { Suspense, lazy, useState} from 'react';
import Pricing from '../components/Pricing';
import '../styles/Pricing.css';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import AOS from 'aos';

const PricingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Choose the Perfect Plan for Your Business"
        subtitle="Our pricing plans are designed to meet the needs of all businesses, regardless of size or budget. Choose the plan that best suits your needs and start building your dream website today!"
        // backgroundImage={heroBackground}
      />

      {/* Get Started Button */}
      {/* <section className="text-center my-4">
        <GetStartedButton text="Get Started" to="/get-started" />
      </section> */}

      {/* Lazy Loaded Sections */}
      <Suspense fallback={<div>Loading...</div>}>
        
        
        <Pricing />
        <FAQ />
        <CTA />
        
        
       
      </Suspense>

    
    </div>
  );
};

export default PricingPage;
