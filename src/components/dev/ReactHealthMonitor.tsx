
import React from 'react';
import { validateReactContext } from '@/utils/reactValidation';

/**
 * Development component to monitor React context health
 * Only renders in development mode
 */
export const ReactHealthMonitor: React.FC = () => {
  const [isHealthy, setIsHealthy] = React.useState(true);
  const [lastCheck, setLastCheck] = React.useState<Date>(new Date());

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const checkHealth = () => {
      try {
        validateReactContext();
        setIsHealthy(true);
        setLastCheck(new Date());
      } catch (error) {
        console.error('React health check failed:', error);
        setIsHealthy(false);
      }
    };

    // Initial check
    checkHealth();

    // Periodic checks every 30 seconds
    const interval = setInterval(checkHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        padding: '4px 8px',
        fontSize: '10px',
        backgroundColor: isHealthy ? '#22c55e' : '#ef4444',
        color: 'white',
        zIndex: 9999,
        opacity: 0.7
      }}
      title={`React Health: ${isHealthy ? 'OK' : 'ERROR'} | Last check: ${lastCheck.toLocaleTimeString()}`}
    >
      React: {isHealthy ? '✓' : '✗'}
    </div>
  );
};
