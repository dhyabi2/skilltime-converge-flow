
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import i18n from './i18n/config'

// Wait for i18n to be ready before rendering
const renderApp = async () => {
  // Ensure i18n is initialized
  if (!i18n.isInitialized) {
    await i18n.init();
  }
  
  createRoot(document.getElementById("root")!).render(<App />);
};

renderApp();
