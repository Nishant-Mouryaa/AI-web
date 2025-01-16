// src/pages/Pricing.js

import HeroSection from '../components/HeroSection';
import React, { Suspense, lazy, useState} from 'react';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import AOS from 'aos';

const FAQPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Have Questions? We Have Answers!"
        subtitle=" Find answers to the most frequently asked questions about AI Builder and our services"
        // backgroundImage={heroBackground}
      />

      {/* Get Started Button */}
      {/* <section className="text-center my-4">
        <GetStartedButton text="Get Started" to="/get-started" />
      </section> */}

      {/* Lazy Loaded Sections */}
      <Suspense fallback={<div>Loading...</div>}>
        
        
      
        <FAQ />
        <CTA />
        
       
      </Suspense>

    
    </div>
  );
};

export default FAQPage;
