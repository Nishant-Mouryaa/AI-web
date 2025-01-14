import React, { useState } from 'react';
import '../styles/FAQ.css';

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
];

const FAQ = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const filteredFAQs = faqData.map((categoryData) => ({
    ...categoryData,
    faqs: categoryData.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const hasResults = filteredFAQs.some((category) => category.faqs.length > 0);

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <p className="faq-intro">Find answers organized by topic for your convenience.</p>

      <input
        type="text"
        className="faq-search"
        placeholder="Search FAQs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {hasResults ? (
        filteredFAQs.map((categoryData, index) => (
          <div key={index} className="faq-category">
            <h2
              className="faq-category-title"
              onClick={() => toggleCategory(categoryData.category)}
            >
              {categoryData.category}
            </h2>
            <div
              className={`faq-items ${
                openCategory === categoryData.category ? 'expanded' : 'collapsed'
              }`}
            >
              {categoryData.faqs.map((faq, idx) => (
                <div key={idx} className="faq-item">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="no-results">No FAQs match your search.</p>
      )}
    </div>
  );
};

export default FAQ;
