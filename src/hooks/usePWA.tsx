
import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstalled, setIsInstalled] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkInstallStatus = () => {
      const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebAppMode = (window.navigator as any).standalone === true;
      const isInstalled = isInStandaloneMode || isInWebAppMode;
      setIsInstalled(isInstalled);
      
      // Don't show install prompt if already installed
      if (isInstalled) {
        setIsInstallable(false);
      }
    };

    checkInstallStatus();

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      console.log('PWA install prompt available');
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstallable(false);
      setIsInstalled(true);
      console.log('PWA was installed');
      
      // Store installation status
      localStorage.setItem('pwa-installed', 'true');
    };

    const handleOnline = () => {
      setIsOnline(true);
      console.log('App is online');
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log('App is offline');
    };

    // Service worker update detection
    const handleServiceWorkerUpdate = () => {
      setUpdateAvailable(true);
      console.log('Service worker update available');
    };

    // Register event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', handleServiceWorkerUpdate);
      
      // Register service worker if not already registered
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('SW registered: ', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    setUpdateAvailable(true);
                    console.log('New content is available; please refresh.');
                  } else {
                    console.log('Content is cached for offline use.');
                  }
                }
              });
            }
          });
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Check if user has previously dismissed the install prompt
    const dismissedInstall = localStorage.getItem('pwa-install-dismissed');
    if (dismissedInstall) {
      const dismissedTime = parseInt(dismissedInstall);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      
      // Show prompt again after 7 days
      if (daysSinceDismissed < 7) {
        setIsInstallable(false);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('controllerchange', handleServiceWorkerUpdate);
      }
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) {
      console.warn('No install prompt available');
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstallable(false);
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
        // Store dismissal time
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
      }
    } catch (error) {
      console.error('Error during app installation:', error);
    }
  };

  const updateApp = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration?.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    }
  };

  const dismissInstallPrompt = () => {
    setIsInstallable(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  return {
    isInstallable,
    isInstalled,
    isOnline,
    updateAvailable,
    installApp,
    updateApp,
    dismissInstallPrompt
  };
};
