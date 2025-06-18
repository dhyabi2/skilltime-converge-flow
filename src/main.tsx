import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n/config';
import { validateReactContext, startReactHealthMonitoring } from './utils/reactValidation';

// Enhanced React validation with early error detection
const initializeApp = async () => {
  // Validate React context early to catch import issues
  if (process.env.NODE_ENV === 'development') {
    try {
      await validateReactContext();
      console.log('React validation with edge function completed');
      // Start global React health monitoring
      startReactHealthMonitoring();
    } catch (error) {
      console.error('React validation failed:', error);
      // Don't prevent app initialization, but log the issue
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
};

// Initialize the app
initializeApp().catch((error) => {
  console.error('Failed to initialize app:', error);
});
