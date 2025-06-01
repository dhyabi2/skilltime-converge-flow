
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { useEmotionalContext } from './EmotionalContext';
import { getEmotionalPreset } from './emotionalPresets';

interface EmotionalCardProps {
  children: React.ReactNode;
  skillCategory: string;
  emotionalIntensity?: 'low' | 'medium' | 'high';
  onEmotionalResponse?: (emotion: string) => void;
  className?: string;
}

const EmotionalCard: React.FC<EmotionalCardProps> = ({
  children,
  skillCategory,
  emotionalIntensity = 'medium',
  onEmotionalResponse,
  className = ''
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);
  const { userMood, emotionalPreferences } = useEmotionalContext();
  const [isHovered, setIsHovered] = useState(false);
  const [hoverDuration, setHoverDuration] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (!cardRef.current) return;

    const preset = getEmotionalPreset(skillCategory, userMood, emotionalIntensity);
    
    // Initial breathing animation
    gsap.to(cardRef.current, {
      scale: 1.02,
      duration: preset.breathingSpeed,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Color pulse based on emotional state
    gsap.to(cardRef.current, {
      boxShadow: `0 0 ${preset.glowIntensity}px ${preset.emotionalColor}40`,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, [skillCategory, userMood, emotionalIntensity]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    const startTime = Date.now();
    
    if (!cardRef.current) return;
    
    const preset = getEmotionalPreset(skillCategory, userMood, emotionalIntensity);
    
    // Emotional hover response
    gsap.to(cardRef.current, {
      scale: preset.hoverScale,
      rotationY: preset.hoverRotation,
      duration: 0.4,
      ease: "back.out(1.7)"
    });

    // Create emotional particles
    createEmotionalParticles(preset);
    
    // Track hover duration for emotion detection
    setTimeout(() => {
      if (isHovered) {
        const duration = Date.now() - startTime;
        setHoverDuration(duration);
        detectEmotionalState(duration);
      }
    }, 500);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoverDuration(0);
    
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, {
      scale: 1,
      rotationY: 0,
      duration: 0.3,
      ease: "power2.out"
    });

    // Clear particles
    if (particleRef.current) {
      gsap.to(particleRef.current.children, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        stagger: 0.05,
        onComplete: () => {
          if (particleRef.current) {
            particleRef.current.innerHTML = '';
          }
        }
      });
    }
  };

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    
    if (!cardRef.current) return;
    
    const preset = getEmotionalPreset(skillCategory, userMood, emotionalIntensity);
    
    // Emotional click response
    gsap.to(cardRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    // Success celebration for repeated clicks (shows engagement)
    if (clickCount >= 2) {
      createSuccessCelebration(preset);
      onEmotionalResponse?.('excited');
    } else if (clickCount === 1) {
      onEmotionalResponse?.('interested');
    }
  };

  const createEmotionalParticles = (preset: any) => {
    if (!particleRef.current || !cardRef.current) return;
    
    for (let i = 0; i < preset.particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 rounded-full pointer-events-none';
      particle.style.backgroundColor = preset.emotionalColor;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      particleRef.current.appendChild(particle);
      
      gsap.fromTo(particle, 
        { scale: 0, opacity: 1 },
        { 
          scale: Math.random() * 2 + 1,
          opacity: 0,
          duration: Math.random() * 2 + 1,
          ease: "power2.out",
          delay: Math.random() * 0.5
        }
      );
    }
  };

  const createSuccessCelebration = (preset: any) => {
    if (!cardRef.current) return;
    
    // Burst animation
    gsap.to(cardRef.current, {
      scale: 1.1,
      duration: 0.2,
      ease: "back.out(2)",
      onComplete: () => {
        gsap.to(cardRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(1, 0.5)"
        });
      }
    });

    // Create celebration particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 rounded-full pointer-events-none';
      particle.style.backgroundColor = preset.celebrationColor;
      particle.style.left = '50%';
      particle.style.top = '50%';
      
      if (particleRef.current) {
        particleRef.current.appendChild(particle);
        
        const angle = (i / 20) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        
        gsap.to(particle, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          scale: 0,
          duration: 1,
          ease: "power2.out"
        });
      }
    }
  };

  const detectEmotionalState = (hoverDuration: number) => {
    if (hoverDuration > 2000) {
      onEmotionalResponse?.('contemplating');
    } else if (hoverDuration > 1000) {
      onEmotionalResponse?.('considering');
    } else if (hoverDuration < 200) {
      onEmotionalResponse?.('browsing');
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden cursor-pointer transform-gpu ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ 
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)" 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
    >
      {children}
      
      {/* Particle container */}
      <div 
        ref={particleRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />
      
      {/* Emotional overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-transparent to-black/5" />
      </div>
    </motion.div>
  );
};

export default EmotionalCard;
