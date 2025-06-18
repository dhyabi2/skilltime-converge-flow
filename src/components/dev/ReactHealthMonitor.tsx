import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { startReactHealthMonitoring } from '@/utils/reactValidation';

/**
 * Development component to monitor React context health
 * Only renders in development mode and uses direct edge function calls
 */
export const ReactHealthMonitor: React.FC = () => {
  const [isHealthy, setIsHealthy] = React.useState(true);
  const [lastCheck, setLastCheck] = React.useState<Date>(new Date());

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // Start monitoring with direct edge function calls
    const cleanup = startReactHealthMonitoring();

    // Custom health checker for UI updates using edge function
    const checkHealthForUI = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('react-validation', {
          body: { action: 'health-check' }
        });
        
        if (error) {
          console.error('Edge function health check failed:', error);
          setIsHealthy(false);
        } else {
          console.log('Edge function health check result:', data);
          setIsHealthy(true);
        }
        
        setLastCheck(new Date());
      } catch (error) {
        console.error('React health check failed:', error);
        setIsHealthy(false);
      }
    };

    // Initial check
    checkHealthForUI();

    // UI update checks every 30 seconds using edge function
    const uiInterval = setInterval(checkHealthForUI, 30000);

    return () => {
      cleanup();
      clearInterval(uiInterval);
    };
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
