
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeIntroModal: React.FC<WelcomeIntroModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [lastFocusedElement, setLastFocusedElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!overlayRef.current || !containerRef.current) return;

    // Create GSAP timeline with onReverseComplete callback
    const tl = gsap.timeline({ 
      paused: true,
      onReverseComplete: () => {
        // Ensure visibility and opacity are fully reset after closing animation
        if (overlayRef.current) {
          overlayRef.current.style.visibility = 'hidden';
          overlayRef.current.style.opacity = '0';
        }
        if (containerRef.current) {
          containerRef.current.style.visibility = 'hidden';
          containerRef.current.style.opacity = '0';
        }

        // Return focus to the element that was focused before the popup opened
        if (lastFocusedElement && 'focus' in lastFocusedElement) {
          (lastFocusedElement as HTMLElement).focus();
        } else {
          // If no element was focused, return focus to the body
          document.body.focus();
        }
      }
    });
    timelineRef.current = tl;

    tl.to(overlayRef.current, {
      duration: 0.3,
      autoAlpha: 1
    })
    .to(containerRef.current, {
      duration: 0.5,
      scale: 1,
      autoAlpha: 1,
      ease: "back.out(1.7)"
    }, "-=0.2")
    .from(".welcome-header > *", {
      y: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2
    })
    .from(".welcome-text", {
      y: -20,
      autoAlpha: 0,
      duration: 0.5
    }, "-=0.3")
    .from(".welcome-icon-item", {
      duration: 0.5,
      scale: 0.5,
      opacity: 0,
      stagger: 0.2,
      ease: "elastic.out(1, 0.75)"
    }, "-=0.3")
    .from(".welcome-start-btn", {
      duration: 0.5,
      y: 20,
      autoAlpha: 0
    }, "-=0.5")
    .to(".welcome-start-btn", {
      scale: 1.05,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [lastFocusedElement]);

  useEffect(() => {
    if (timelineRef.current) {
      if (isOpen) {
        // Store the currently focused element before opening the popup
        setLastFocusedElement(document.activeElement);
        
        timelineRef.current.timeScale(1).play();
        
        // Set focus to the first focusable element in the popup
        setTimeout(() => {
          closeButtonRef.current?.focus();
        }, 400);
      } else {
        timelineRef.current.timeScale(1.5).reverse();
      }
    }
  }, [isOpen]);

  // Handle keyboard events for accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        handleClose();
        return;
      }

      // Focus trapping
      if (event.key === 'Tab') {
        const focusableElements = [closeButtonRef.current, startButtonRef.current].filter(Boolean);
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusable) {
            lastFocusable?.focus();
            event.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusable) {
            firstFocusable?.focus();
            event.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleStartClick = () => {
    onClose();
    navigate('/browse');
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === overlayRef.current) {
      handleClose();
    }
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    const altText = target.alt;
    const fallbackText = altText.includes('Design') ? 'Design' : 
                        altText.includes('Programming') ? 'Code' : 'Market';
    target.src = `https://placehold.co/60x60/cccccc/333333?text=${fallbackText}`;
  };

  const categories = [
    {
      name: 'Design',
      icon: '🎨',
      color: 'from-pink-400 to-purple-400',
      imageUrl: 'https://i.imgur.com/O3aYp5W.png'
    },
    {
      name: 'Programming',
      icon: '💻',
      color: 'from-blue-400 to-cyan-400',
      imageUrl: 'https://i.imgur.com/J4tYp3B.png'
    },
    {
      name: 'Marketing',
      icon: '📈',
      color: 'from-green-400 to-teal-400',
      imageUrl: 'https://i.imgur.com/r6tYp5W.png'
    }
  ];

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 invisible opacity-0 outline-none"
      style={{ zIndex: 1000 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      tabIndex={-1}
      onClick={handleOverlayClick}
    >
      <div 
        ref={containerRef}
        className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md overflow-hidden transform scale-75 opacity-0 invisible"
      >
        {/* Header */}
        <div className="welcome-header bg-gradient-to-r from-soft-blue-400 to-mint-400 text-white p-4 flex justify-between items-center">
          <h2 id="welcome-title" className="text-xl sm:text-2xl font-bold font-cairo m-0">
            {t('app.welcome_title', 'Welcome to SkillTime!')}
          </h2>
          <Button
            ref={closeButtonRef}
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-white hover:bg-white/20 p-1 h-8 w-8 outline-none"
            aria-label="Close popup"
          >
            <X size={24} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <p className="welcome-text text-lg leading-relaxed mb-6 text-slate-600 font-cairo">
            {t('app.welcome_message', 'Your journey to new skills starts here. Discover experts, explore categories, and unlock your potential.')}
          </p>

          {/* Category Icons */}
          <div className="flex justify-around mb-8">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="welcome-icon-item flex flex-col items-center transition-transform duration-200 ease-in-out hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl mb-2 shadow-lg overflow-hidden`}>
                  <img 
                    src={category.imageUrl}
                    alt={`${category.name} icon`}
                    className="w-10 h-10 object-cover filter drop-shadow-sm"
                    onError={handleImageError}
                  />
                </div>
                <span className="text-sm font-medium text-slate-700 font-cairo">
                  {category.name}
                </span>
              </div>
            ))}
          </div>

          {/* Start Button */}
          <Button
            ref={startButtonRef}
            onClick={handleStartClick}
            className="welcome-start-btn bg-gradient-to-r from-soft-blue-500 to-mint-500 hover:from-soft-blue-600 hover:to-mint-600 text-white border-none px-8 py-3 rounded-full text-lg font-bold font-cairo transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg outline-none"
          >
            {t('app.lets_start', "Let's Start!")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeIntroModal;
