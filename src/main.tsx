
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n/config';

// Simplified initialization without dynamic imports
const initializeApp = async () => {
  console.log('Initializing app with React version:', React.version);
  
  // Basic React validation
  if (!React || typeof React.useState !== 'function') {
    console.error('React is not properly loaded');
    throw new Error('React initialization failed');
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
};

// Initialize the app
initializeApp().catch((error) => {
  console.error('Failed to initialize app:', error);
  // Fallback rendering
  const container = document.getElementById("root");
  if (container) {
    container.innerHTML = '<div style="padding: 20px; text-align: center;">Application failed to load. Please refresh the page.</div>';
  }
});
