
import React from 'react';

/**
 * Validates that React is properly imported and available
 * This helps prevent the "Cannot read properties of null (reading 'useState')" error
 */
export const validateReactContext = () => {
  if (!React) {
    throw new Error(
      'React is not properly imported. Make sure to import React from "react" at the top of your component files.'
    );
  }
  
  if (typeof React.useState !== 'function') {
    throw new Error(
      'React hooks are not available. This usually indicates a React import or context issue.'
    );
  }
  
  console.log('React context validation passed');
  return true;
};

/**
 * Direct function call for React validation in components
 * Call this directly in component functions instead of using a hook
 */
export const validateReactInComponent = () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      validateReactContext();
    } catch (error) {
      console.error('React validation failed in component:', error);
      throw error;
    }
  }
};

/**
 * Periodic React health checker using direct function calls
 */
export const startReactHealthMonitoring = () => {
  if (process.env.NODE_ENV !== 'development') {
    return () => {}; // Return empty cleanup function
  }

  const checkHealth = () => {
    try {
      validateReactContext();
      console.log('React health check: OK');
      return true;
    } catch (error) {
      console.error('React health check failed:', error);
      return false;
    }
  };

  // Initial check
  checkHealth();

  // Periodic checks every 30 seconds
  const interval = setInterval(checkHealth, 30000);

  // Return cleanup function
  return () => clearInterval(interval);
};
