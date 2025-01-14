// src/pages/Home.js

import React, { Suspense, lazy } from 'react';
import HeroSection from '../components/HeroSection';
import Description from '../components/Description';
import GetStartedButton from '../components/GetStartedButton';
// Lazy load additional components
const Features = lazy(() => import('../components/Features'));
const HowItWorks = lazy(() => import('../components/HowItWorks'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Pricing = lazy(() => import('../components/Pricing'));
const Gallery = lazy(() => import('../components/Gallery'));
const CTA = lazy(() => import('../components/CTA'));
const FAQ = lazy(() => import('../components/FAQ'));
const Contact = lazy(() => import('../components/Contact'));
const Newsletter = lazy(() => import('../components/Newsletter'));

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Create Stunning Websites with AI in Minutes!"
        subtitle="No coding. No hassle. Just smarter, faster, and more beautiful websites for your business."
        // backgroundImage={heroBackground}
      />

      {/* Get Started Button */}
      <section className="text-center my-4">
        <GetStartedButton text="Get Started" to="/get-started" />
      </section>

      {/* Lazy Loaded Sections */}
      <Suspense fallback={<div>Loading...</div>}>
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <Gallery />
        <CTA />
        <FAQ />
        <Newsletter />
        <Contact />
      </Suspense>

      {/* Description Section */}
      <Description
        text="AI Builder is a platform that leverages artificial intelligence to provide you with personalized website templates tailored to your specific needs and industry. Whether you're building an e-commerce store, a personal blog, or a corporate website, AI Builder has got you covered."
      />
    </div>
  );
};

export default Home;
