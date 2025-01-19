// src/components/ErrorBoundary.js

import React from 'react';
import { Alert } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="danger" className="mt-5 text-center">
          Something went wrong. Please try refreshing the page or contact support.
        </Alert>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
 
