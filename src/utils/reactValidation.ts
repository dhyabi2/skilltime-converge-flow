
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
 * Development-only React validation hook
 * Use this in components that have had React import issues
 */
export const useReactValidation = () => {
  if (process.env.NODE_ENV === 'development') {
    React.useEffect(() => {
      validateReactContext();
    }, []);
  }
};
