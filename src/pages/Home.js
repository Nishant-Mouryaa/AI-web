// src/pages/Home.js

import React from 'react';
import HeroSection from '../components/HeroSection';
import Description from '../components/Description';
import GetStartedButton from '../components/GetStartedButton';

// Placeholder background image URL (you can replace it with your own image)
// const heroBackground = 'https://via.placeholder.com/1920x600.png?text=Hero+Background';

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
       <section className="text-center my-0">
        <GetStartedButton text="Get Started" to="/get-started" />
      </section>
      {/* Description Section */}
      <Description
        text="AI Builder is a platform that leverages artificial intelligence to provide you with personalized website templates tailored to your specific needs and industry. Whether you're building an e-commerce store, a personal blog, or a corporate website, AI Builder has got you covered."
      />

     
    </div>
  );
};

export default Home;
