// src/pages/FAQ.js

import React, { useState } from 'react';
import '../styles/FAQ.css';
import { Container, Accordion, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FaPlus, FaMinus, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AOS from 'aos';
import Highlighter from 'react-highlight-words';
import 'aos/dist/aos.css'; // Import AOS styles

const faqData = [
  {
    category: 'Billing',
    faqs: [
      {
        question: 'What happens if I exceed my plan limits?',
        answer: 'You can upgrade to a higher plan anytime.',
      },
      {
        question: 'Do you offer refunds?',
        answer: 'Yes, we offer a 14-day money-back guarantee.',
      },
    ],
  },
  {
    category: 'Account Management',
    faqs: [
      {
        question: 'Can I switch plans later?',
        answer: 'Absolutely. You can upgrade or downgrade anytime.',
      },
      {
        question: 'How do I reset my password?',
        answer: 'Click on "Forgot Password" on the login page to reset it.',
      },
    ],
  },
  {
    category: 'Technical Support',
    faqs: [
      {
        question: 'How do I report an issue?',
        answer: 'Use the support form in your account dashboard.',
      },
      {
        question: 'Is the platform mobile-friendly?',
        answer: 'Absolutely! All sites are responsive and optimized for mobile devices.',
      },
    ],
  },
  // Add more categories and FAQs as needed
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Initialize AOS
  React.useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration
      once: true,    // Whether animation should happen only once
    });
  }, []);

  // Function to filter FAQs based on search query and active category
  const filteredFAQs = faqData
    .filter((categoryData) => activeCategory === 'All' || categoryData.category === activeCategory)
    .map((categoryData) => ({
      ...categoryData,
      faqs: categoryData.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((categoryData) => categoryData.faqs.length > 0); // Remove categories with no matching FAQs

  const hasResults = filteredFAQs.length > 0;

  return (
    <Container className="faq-container my-5" id="faq">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        data-aos="fade-up"
      >
        <h1 className="faq-title text-center mb-4">Frequently Asked Questions</h1>
        <p className="faq-intro text-center mb-4">
          Find answers organized by topic for your convenience.
        </p>

        {/* Search Bar */}
        <Form className="mb-4" aria-label="Search FAQs">
          <InputGroup>
            <InputGroup.Text id="search-icon">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search FAQs..."
              aria-label="Search FAQs"
              aria-describedby="search-icon"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Form>

        {/* Category Filters */}
        <div className="category-filters text-center mb-4">
          {['All', 'Billing', 'Account Management', 'Technical Support'].map((category, idx) => (
            <Button
              key={idx}
              variant={activeCategory === category ? 'primary' : 'outline-primary'}
              className="me-2 mb-2"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              aria-label={`Filter by ${category}`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Display FAQs */}
        {hasResults ? (
          filteredFAQs.map((categoryData, index) => (
            <Accordion
              key={index}
              className="faq-category"
              defaultActiveKey={null}
              alwaysOpen={false}
              flush
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span className="category-title">{categoryData.category}</span>
                </Accordion.Header>
                <Accordion.Body>
                  {categoryData.faqs.map((faq, idx) => (
                    <Accordion key={idx} className="faq-item" flush>
                      <Accordion.Item eventKey={idx.toString()}>
                        <Accordion.Header>
                          <Highlighter
                            highlightClassName="highlight"
                            searchWords={[searchQuery]}
                            autoEscape={true}
                            textToHighlight={faq.question}
                          />
                        </Accordion.Header>
                        <Accordion.Body>
                          <Highlighter
                            highlightClassName="highlight"
                            searchWords={[searchQuery]}
                            autoEscape={true}
                            textToHighlight={faq.answer}
                          />
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))
        ) : (
          <p className="no-results text-center">No FAQs match your search.</p>
        )}
      </motion.div>
    </Container>
  );
};

export default FAQ;
