
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n/config';
import { validateReactContext } from './utils/reactValidation';

// Validate React context early to catch import issues
if (process.env.NODE_ENV === 'development') {
  try {
    validateReactContext();
  } catch (error) {
    console.error('React validation failed:', error);
  }
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
