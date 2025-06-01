
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEmotionalContext } from './EmotionalContext';

gsap.registerPlugin(ScrollTrigger);

interface JourneyAnimatorProps {
  phase: 'discovery' | 'consideration' | 'decision' | 'booking';
  children: React.ReactNode;
  className?: string;
}

const JourneyAnimator: React.FC<JourneyAnimatorProps> = ({ 
  phase, 
  children, 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { userMood, updateContextualState, triggerEmotionalResponse } = useEmotionalContext();

  useEffect(() => {
    updateContextualState({ currentPhase: phase });
  }, [phase]);

  useEffect(() => {
    if (!containerRef.current) return;

    const animations = getPhaseAnimations(phase, userMood);
    
    // Clear existing animations
    gsap.killTweensOf(containerRef.current);
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === containerRef.current) {
        trigger.kill();
      }
    });

    // Apply phase-specific animations
    animations.forEach(animation => {
      if (animation.trigger === 'scroll') {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: animation.start || "top 80%",
          end: animation.end || "bottom 20%",
          onEnter: () => {
            if (containerRef.current) {
              gsap.to(containerRef.current, animation.properties);
            }
            triggerEmotionalResponse(animation.emotion || 'engaged');
          },
          onLeave: () => {
            if (animation.onLeave && containerRef.current) {
              gsap.to(containerRef.current, animation.onLeave);
            }
          }
        });
      } else {
        gsap.to(containerRef.current, animation.properties);
        triggerEmotionalResponse(animation.emotion || 'engaged');
      }
    });

    return () => {
      gsap.killTweensOf(containerRef.current);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [phase, userMood]);

  return (
    <div 
      ref={containerRef}
      className={`journey-phase-${phase} ${className}`}
      data-phase={phase}
    >
      {children}
    </div>
  );
};

const getPhaseAnimations = (phase: string, mood: string) => {
  const baseAnimations = {
    discovery: [
      {
        trigger: 'immediate',
        properties: {
          opacity: 0,
          y: 30,
          duration: 0
        },
        emotion: 'curious'
      },
      {
        trigger: 'scroll',
        start: "top 90%",
        properties: {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1
        },
        emotion: 'discovering'
      },
      {
        trigger: 'scroll',
        start: "top 50%",
        properties: {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        },
        onLeave: {
          scale: 1,
          duration: 0.3
        },
        emotion: 'interested'
      }
    ],
    consideration: [
      {
        trigger: 'immediate',
        properties: {
          opacity: 0,
          scale: 0.95,
          duration: 0
        },
        emotion: 'evaluating'
      },
      {
        trigger: 'scroll',
        start: "top 85%",
        properties: {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.2)"
        },
        emotion: 'considering'
      },
      {
        trigger: 'scroll',
        start: "top 40%",
        properties: {
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          duration: 0.5,
          ease: "power2.out"
        },
        onLeave: {
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          duration: 0.3
        },
        emotion: 'weighing_options'
      }
    ],
    decision: [
      {
        trigger: 'immediate',
        properties: {
          opacity: 0,
          rotationY: -15,
          duration: 0
        },
        emotion: 'deciding'
      },
      {
        trigger: 'scroll',
        start: "top 80%",
        properties: {
          opacity: 1,
          rotationY: 0,
          duration: 1,
          ease: "power3.out"
        },
        emotion: 'gaining_confidence'
      },
      {
        trigger: 'scroll',
        start: "top 30%",
        properties: {
          scale: 1.05,
          borderWidth: "2px",
          borderColor: "#10B981",
          duration: 0.4,
          ease: "elastic.out(1, 0.3)"
        },
        onLeave: {
          scale: 1,
          borderWidth: "1px",
          borderColor: "transparent",
          duration: 0.3
        },
        emotion: 'ready_to_commit'
      }
    ],
    booking: [
      {
        trigger: 'immediate',
        properties: {
          opacity: 0,
          scale: 0.8,
          duration: 0
        },
        emotion: 'committing'
      },
      {
        trigger: 'scroll',
        start: "top 75%",
        properties: {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(2)"
        },
        emotion: 'taking_action'
      },
      {
        trigger: 'scroll',
        start: "top 25%",
        properties: {
          backgroundColor: "#F0FDF4",
          scale: 1.08,
          boxShadow: "0 20px 40px rgba(16, 185, 129, 0.2)",
          duration: 0.5,
          ease: "power2.out"
        },
        onLeave: {
          backgroundColor: "transparent",
          scale: 1,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          duration: 0.4
        },
        emotion: 'excited_to_book'
      }
    ]
  };

  const moodMultipliers = {
    calm: { duration: 1.2, intensity: 0.8 },
    excited: { duration: 0.7, intensity: 1.3 },
    focused: { duration: 1, intensity: 1 },
    stressed: { duration: 0.5, intensity: 0.6 },
    happy: { duration: 0.9, intensity: 1.1 },
    contemplative: { duration: 1.5, intensity: 0.9 }
  };

  const animations = baseAnimations[phase as keyof typeof baseAnimations] || baseAnimations.discovery;
  const multiplier = moodMultipliers[mood as keyof typeof moodMultipliers] || moodMultipliers.calm;

  // Apply mood-based adjustments
  return animations.map(animation => ({
    ...animation,
    properties: {
      ...animation.properties,
      duration: (animation.properties.duration || 1) * multiplier.duration,
      scale: animation.properties.scale ? 
        1 + (animation.properties.scale - 1) * multiplier.intensity :
        animation.properties.scale
    }
  }));
};

export default JourneyAnimator;
