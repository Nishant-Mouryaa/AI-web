// src/components/FAQ.js

import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

const FAQ = () => {
  const faqData = [
    {
      question: 'What is AI Builder?',
      answer:
        'AI Builder is a platform that leverages artificial intelligence to provide personalized website templates tailored to your specific needs and industry.',
    },
    {
      question: 'Do I need to know how to code?',
      answer:
        'No coding skills are required. AI Builder allows you to create and customize stunning websites effortlessly.',
    },
    {
      question: 'Can I customize the templates?',
      answer:
        'Absolutely! All templates are fully customizable to match your brand’s look and feel.',
    },
    {
      question: 'What kind of support is available?',
      answer:
        'We offer comprehensive support, including email assistance, detailed documentation, and a community forum.',
    },
    // Add more FAQs as needed
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Frequently Asked Questions</h2>
      <Accordion defaultActiveKey="0">
        {faqData.map((faq, index) => (
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
 
