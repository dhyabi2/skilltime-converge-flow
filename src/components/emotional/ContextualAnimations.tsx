
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useEmotionalContext } from './EmotionalContext';
import { getEmotionalColorPalette } from './emotionalPresets';

interface ContextualAnimationsProps {
  skillCategory: string;
  children: React.ReactNode;
  className?: string;
}

const ContextualAnimations: React.FC<ContextualAnimationsProps> = ({
  skillCategory,
  children,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { userMood, contextualState, emotionalPreferences } = useEmotionalContext();

  useEffect(() => {
    if (!containerRef.current) return;

    const colorPalette = getEmotionalColorPalette(userMood, contextualState.timeOfDay);
    const categoryTheme = getCategoryTheme(skillCategory);
    
    // Apply contextual styling
    applyContextualStyling(containerRef.current, colorPalette, categoryTheme);
    
    // Apply category-specific animations
    applyCategoryAnimations(containerRef.current, skillCategory, userMood);
    
    // Apply time-of-day effects
    applyTimeOfDayEffects(containerRef.current, contextualState.timeOfDay);

  }, [skillCategory, userMood, contextualState.timeOfDay]);

  return (
    <div 
      ref={containerRef}
      className={`contextual-container category-${skillCategory.toLowerCase()} mood-${userMood} time-${contextualState.timeOfDay} ${className}`}
      data-category={skillCategory}
      data-mood={userMood}
      data-time={contextualState.timeOfDay}
    >
      {children}
    </div>
  );
};

const getCategoryTheme = (category: string) => {
  const themes = {
    design: {
      primaryColor: '#8B5CF6',
      secondaryColor: '#EC4899',
      animationStyle: 'organic',
      particleType: 'flowing',
      visualMetaphors: ['paint_brush', 'color_splash', 'creative_spark']
    },
    development: {
      primaryColor: '#3B82F6',
      secondaryColor: '#06B6D4',
      animationStyle: 'geometric',
      particleType: 'digital',
      visualMetaphors: ['code_compilation', 'data_flow', 'system_boot']
    },
    music: {
      primaryColor: '#7C3AED',
      secondaryColor: '#F59E0B',
      animationStyle: 'rhythmic',
      particleType: 'waves',
      visualMetaphors: ['sound_waves', 'rhythm_pulse', 'harmonic_resonance']
    },
    writing: {
      primaryColor: '#F59E0B',
      secondaryColor: '#10B981',
      animationStyle: 'flowing',
      particleType: 'ink',
      visualMetaphors: ['ink_flow', 'word_formation', 'story_unfolding']
    },
    photography: {
      primaryColor: '#0891B2',
      secondaryColor: '#BE185D',
      animationStyle: 'capture',
      particleType: 'light',
      visualMetaphors: ['light_capture', 'moment_freeze', 'lens_focus']
    },
    marketing: {
      primaryColor: '#059669',
      secondaryColor: '#DC2626',
      animationStyle: 'growth',
      particleType: 'energy',
      visualMetaphors: ['viral_spread', 'network_growth', 'impact_waves']
    }
  };

  return themes[category.toLowerCase() as keyof typeof themes] || themes.design;
};

const applyContextualStyling = (element: HTMLElement, colorPalette: string[], categoryTheme: any) => {
  gsap.to(element, {
    '--primary-color': categoryTheme.primaryColor,
    '--secondary-color': categoryTheme.secondaryColor,
    '--palette-light': colorPalette[0],
    '--palette-medium': colorPalette[1],
    '--palette-dark': colorPalette[2],
    duration: 1,
    ease: "power2.out"
  });
};

const applyCategoryAnimations = (element: HTMLElement, category: string, mood: string) => {
  const animations = {
    design: () => {
      // Organic flowing animations
      gsap.to(element, {
        backgroundImage: `radial-gradient(circle at 30% 70%, ${getCategoryTheme(category).primaryColor}20 0%, transparent 50%), 
                         radial-gradient(circle at 70% 30%, ${getCategoryTheme(category).secondaryColor}20 0%, transparent 50%)`,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
      
      // Add creative sparkle effect
      createSparkleEffect(element, 'creative');
    },
    
    development: () => {
      // Code-like grid effect
      gsap.to(element, {
        backgroundImage: `linear-gradient(90deg, ${getCategoryTheme(category).primaryColor}10 1px, transparent 1px),
                         linear-gradient(${getCategoryTheme(category).secondaryColor}10 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
      
      // Matrix-style digital rain
      createDigitalRainEffect(element);
    },
    
    music: () => {
      // Rhythmic pulsing
      const bpm = mood === 'excited' ? 120 : mood === 'calm' ? 60 : 80;
      const interval = 60000 / bpm; // Convert BPM to milliseconds
      
      gsap.to(element, {
        scale: 1.02,
        duration: interval / 2000,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
      
      // Sound wave visualization
      createSoundWaveEffect(element, bpm);
    },
    
    writing: () => {
      // Typewriter effect on background
      gsap.to(element, {
        backgroundPosition: '100% 0%',
        duration: 4,
        ease: "none",
        repeat: -1
      });
      
      // Ink flow effect
      createInkFlowEffect(element);
    },
    
    photography: () => {
      // Camera flash effect
      gsap.to(element, {
        filter: `brightness(${mood === 'excited' ? 1.2 : 1.05})`,
        duration: 0.1,
        repeat: -1,
        repeatDelay: Math.random() * 5 + 3,
        yoyo: true
      });
      
      // Bokeh light effects
      createBokehEffect(element);
    },
    
    marketing: () => {
      // Growth chart animation
      gsap.to(element, {
        clipPath: 'polygon(0% 100%, 20% 80%, 40% 85%, 60% 70%, 80% 60%, 100% 40%)',
        duration: 2,
        ease: "power2.out",
        repeat: -1,
        yoyo: true
      });
      
      // Network connection effect
      createNetworkEffect(element);
    }
  };

  const categoryAnimation = animations[category.toLowerCase() as keyof typeof animations];
  if (categoryAnimation) {
    categoryAnimation();
  }
};

const applyTimeOfDayEffects = (element: HTMLElement, timeOfDay: string) => {
  const effects = {
    morning: () => {
      gsap.to(element, {
        filter: 'brightness(1.1) saturate(1.2) hue-rotate(10deg)',
        duration: 1,
        ease: "power2.out"
      });
    },
    afternoon: () => {
      gsap.to(element, {
        filter: 'brightness(1) saturate(1) hue-rotate(0deg)',
        duration: 1,
        ease: "power2.out"
      });
    },
    evening: () => {
      gsap.to(element, {
        filter: 'brightness(0.9) saturate(0.8) hue-rotate(-10deg)',
        duration: 1,
        ease: "power2.out"
      });
    },
    night: () => {
      gsap.to(element, {
        filter: 'brightness(0.7) saturate(0.6) hue-rotate(-20deg) contrast(1.1)',
        duration: 1,
        ease: "power2.out"
      });
    }
  };

  const effect = effects[timeOfDay as keyof typeof effects];
  if (effect) {
    effect();
  }
};

// Special effect functions
const createSparkleEffect = (element: HTMLElement, type: string) => {
  for (let i = 0; i < 5; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'absolute w-1 h-1 bg-yellow-400 rounded-full pointer-events-none';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    element.appendChild(sparkle);
    
    gsap.fromTo(sparkle,
      { scale: 0, opacity: 1 },
      {
        scale: 2,
        opacity: 0,
        duration: Math.random() * 2 + 1,
        ease: "power2.out",
        delay: Math.random() * 3,
        repeat: -1,
        repeatDelay: Math.random() * 5 + 2
      }
    );
  }
};

const createDigitalRainEffect = (element: HTMLElement) => {
  for (let i = 0; i < 10; i++) {
    const drop = document.createElement('div');
    drop.className = 'absolute w-0.5 h-8 bg-green-400 opacity-60 pointer-events-none';
    drop.style.left = Math.random() * 100 + '%';
    drop.style.top = '-32px';
    element.appendChild(drop);
    
    gsap.to(drop, {
      y: element.offsetHeight + 32,
      duration: Math.random() * 2 + 1,
      ease: "none",
      delay: Math.random() * 2,
      repeat: -1,
      repeatDelay: Math.random() * 3
    });
  }
};

const createSoundWaveEffect = (element: HTMLElement, bpm: number) => {
  for (let i = 0; i < 3; i++) {
    const wave = document.createElement('div');
    wave.className = 'absolute h-0.5 bg-purple-400 opacity-40 pointer-events-none';
    wave.style.left = '0%';
    wave.style.top = 20 + (i * 20) + '%';
    wave.style.width = '0%';
    element.appendChild(wave);
    
    gsap.to(wave, {
      width: '100%',
      duration: (60000 / bpm) / 1000,
      ease: "power2.out",
      repeat: -1,
      delay: i * 0.1
    });
  }
};

const createInkFlowEffect = (element: HTMLElement) => {
  const ink = document.createElement('div');
  ink.className = 'absolute inset-0 pointer-events-none';
  ink.style.background = 'linear-gradient(45deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)';
  ink.style.backgroundSize = '200% 200%';
  element.appendChild(ink);
  
  gsap.to(ink, {
    backgroundPosition: '100% 100%',
    duration: 4,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true
  });
};

const createBokehEffect = (element: HTMLElement) => {
  for (let i = 0; i < 8; i++) {
    const bokeh = document.createElement('div');
    bokeh.className = 'absolute rounded-full bg-white opacity-20 pointer-events-none';
    const size = Math.random() * 20 + 10;
    bokeh.style.width = size + 'px';
    bokeh.style.height = size + 'px';
    bokeh.style.left = Math.random() * 100 + '%';
    bokeh.style.top = Math.random() * 100 + '%';
    element.appendChild(bokeh);
    
    gsap.to(bokeh, {
      scale: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 4 + 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 2
    });
  }
};

const createNetworkEffect = (element: HTMLElement) => {
  // Create connection lines
  for (let i = 0; i < 5; i++) {
    const line = document.createElement('div');
    line.className = 'absolute h-px bg-green-400 opacity-40 pointer-events-none';
    line.style.left = Math.random() * 50 + '%';
    line.style.top = Math.random() * 100 + '%';
    line.style.width = '0%';
    line.style.transformOrigin = 'left center';
    line.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
    element.appendChild(line);
    
    gsap.to(line, {
      width: Math.random() * 50 + 25 + '%',
      duration: Math.random() * 2 + 1,
      ease: "power2.out",
      delay: Math.random() * 3,
      repeat: -1,
      yoyo: true
    });
  }
};

export default ContextualAnimations;
