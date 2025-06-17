
import React from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Enhanced React context validation with better error detection
 */
export const validateReactContext = async (): Promise<boolean> => {
  // Check if React is available
  if (!React) {
    const error = new Error('React is not properly imported. Make sure to import React from "react" at the top of your component files.');
    console.error('React validation failed:', error.message);
    throw error;
  }
  
  // Check if React hooks are available
  if (typeof React.useState !== 'function') {
    const error = new Error('React hooks are not available. This usually indicates a React import or context issue.');
    console.error('React validation failed:', error.message);
    throw error;
  }
  
  // Check React version compatibility
  if (typeof React.createElement !== 'function') {
    const error = new Error('React.createElement is not available. This indicates a serious React context issue.');
    console.error('React validation failed:', error.message);
    throw error;
  }
  
  console.log('React context validation passed - all hooks and functions available');
  
  // Call edge function for validation tracking
  try {
    const { data, error } = await supabase.functions.invoke('react-validation', {
      body: { action: 'validate' }
    });
    
    if (error) {
      console.error('Edge function validation error:', error);
    } else {
      console.log('Edge function validation result:', data);
    }
  } catch (error) {
    console.error('Failed to call validation edge function:', error);
  }
  
  return true;
};

/**
 * Direct function call for React validation in components
 */
export const validateReactInComponent = async (): Promise<boolean> => {
  if (process.env.NODE_ENV === 'development') {
    try {
      await validateReactContext();
    } catch (error) {
      console.error('React validation failed in component:', error);
      // Don't throw to prevent component crashes
      return false;
    }
  }
  return true;
};

/**
 * Enhanced periodic React health checker
 */
export const startReactHealthMonitoring = (): (() => void) => {
  if (process.env.NODE_ENV !== 'development') {
    return () => {}; // Return empty cleanup function
  }

  const checkHealth = async (): Promise<boolean> => {
    try {
      const isValid = await validateReactContext();
      
      if (isValid) {
        // Call edge function for health check
        const { data, error } = await supabase.functions.invoke('react-validation', {
          body: { action: 'health-check' }
        });
        
        if (error) {
          console.error('Edge function health check error:', error);
          return false;
        }
        
        console.log('React health check: OK', data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('React health check failed:', error);
      return false;
    }
  };

  // Initial check with delay to ensure app is fully loaded
  const initialTimeout = setTimeout(() => {
    checkHealth();
  }, 1000);

  // Periodic checks every 30 seconds
  const interval = setInterval(checkHealth, 30000);

  // Return cleanup function
  return () => {
    clearTimeout(initialTimeout);
    clearInterval(interval);
  };
};
