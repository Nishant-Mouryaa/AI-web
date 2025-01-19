// src/index.js

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import reportWebVitals from './reportWebVitals';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // Import React Query Devtools
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary

// Create a new QueryClient instance with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Disable refetch on window focus
      staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    },
  },
});

// Define the Root component to initialize AOS and wrap App with providers
const Root = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true,      // Whether animation should happen only once
    });
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </React.StrictMode>
  );
};

// Create a root and render the Root component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
