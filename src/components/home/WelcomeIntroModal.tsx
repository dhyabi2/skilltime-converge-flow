
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
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!overlayRef.current || !containerRef.current) return;

    // Create GSAP timeline
    const tl = gsap.timeline({ paused: true });
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
  }, []);

  useEffect(() => {
    if (timelineRef.current) {
      if (isOpen) {
        timelineRef.current.timeScale(1).play();
      } else {
        timelineRef.current.timeScale(1.5).reverse();
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleStartClick = () => {
    onClose();
    navigate('/browse');
  };

  const categories = [
    {
      name: 'Design',
      icon: '🎨',
      color: 'from-pink-400 to-purple-400'
    },
    {
      name: 'Programming',
      icon: '💻',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      name: 'Marketing',
      icon: '📈',
      color: 'from-green-400 to-teal-400'
    }
  ];

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 invisible opacity-0"
      style={{ zIndex: 1000 }}
    >
      <div 
        ref={containerRef}
        className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md overflow-hidden transform scale-75 opacity-0 invisible"
      >
        {/* Header */}
        <div className="welcome-header bg-gradient-to-r from-soft-blue-400 to-mint-400 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold font-cairo m-0">
            {t('app.welcome_title', 'Welcome to SkillTime!')}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-white hover:bg-white/20 p-1 h-8 w-8"
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
              <div key={index} className="welcome-icon-item flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl mb-2 shadow-lg`}>
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-slate-700 font-cairo">
                  {category.name}
                </span>
              </div>
            ))}
          </div>

          {/* Start Button */}
          <Button
            onClick={handleStartClick}
            className="welcome-start-btn bg-gradient-to-r from-soft-blue-500 to-mint-500 hover:from-soft-blue-600 hover:to-mint-600 text-white border-none px-8 py-3 rounded-full text-lg font-bold font-cairo transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
          >
            {t('app.lets_start', "Let's Start!")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeIntroModal;
