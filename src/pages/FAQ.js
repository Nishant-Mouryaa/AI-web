// src/pages/FAQ.js

import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

const FAQ = () => {
  const faqs = [
    {
      question: 'What is AI Builder?',
      answer:
        'AI Builder is a platform that allows you to create and customize websites using AI-powered templates and tools.',
    },
    {
      question: 'How do I get started?',
      answer:
        'Simply sign up for an account, choose a pricing plan that suits your needs, and start building your website with our intuitive editor.',
    },
    {
      question: 'Can I upgrade my plan later?',
      answer:
        'Yes, you can upgrade or downgrade your plan at any time from your account settings.',
    },
    // Add more FAQs as needed
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Frequently Asked Questions</h2>
      <Accordion defaultActiveKey="0">
        {faqs.map((faq, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{faq.question}</Accordion.Header>
            <Accordion.Body>{faq.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default FAQ;
 
