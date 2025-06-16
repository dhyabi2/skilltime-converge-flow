
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n/config';
import { validateReactContext, startReactHealthMonitoring } from './utils/reactValidation';

// Validate React context early to catch import issues with edge function call
if (process.env.NODE_ENV === 'development') {
  validateReactContext().then(() => {
    console.log('React validation with edge function completed');
    // Start global React health monitoring with edge function calls
    startReactHealthMonitoring();
  }).catch((error) => {
    console.error('React validation failed:', error);
  });
}

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
