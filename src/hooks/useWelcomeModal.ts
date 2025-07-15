
import { useState, useEffect } from 'react';

const WELCOME_MODAL_KEY = 'skilltime_welcome_shown';

export const useWelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if welcome modal has been shown before
    const hasBeenShown = localStorage.getItem(WELCOME_MODAL_KEY);
    
    if (!hasBeenShown) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    // Mark as shown so it doesn't appear again
    localStorage.setItem(WELCOME_MODAL_KEY, 'true');
  };

  const resetModal = () => {
    localStorage.removeItem(WELCOME_MODAL_KEY);
    setIsOpen(true);
  };

  return {
    isOpen,
    closeModal,
    resetModal
  };
};
