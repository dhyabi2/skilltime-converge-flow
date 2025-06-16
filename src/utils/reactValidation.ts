
import React from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Validates that React is properly imported and available
 * This helps prevent the "Cannot read properties of null (reading 'useState')" error
 */
export const validateReactContext = async () => {
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
  
  // Call edge function for validation
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
 * Call this directly in component functions instead of using a hook
 */
export const validateReactInComponent = async () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      await validateReactContext();
    } catch (error) {
      console.error('React validation failed in component:', error);
      throw error;
    }
  }
};

/**
 * Periodic React health checker using direct edge function calls
 */
export const startReactHealthMonitoring = () => {
  if (process.env.NODE_ENV !== 'development') {
    return () => {}; // Return empty cleanup function
  }

  const checkHealth = async () => {
    try {
      await validateReactContext();
      
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
