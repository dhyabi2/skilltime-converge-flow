
interface EmotionalPreset {
  breathingSpeed: number;
  glowIntensity: number;
  emotionalColor: string;
  celebrationColor: string;
  hoverScale: number;
  hoverRotation: number;
  particleCount: number;
  storyAnimation: string;
  beforeAfterTransform: any;
}

const categoryEmotions = {
  design: {
    calm: {
      breathingSpeed: 3,
      glowIntensity: 15,
      emotionalColor: '#8B5CF6',
      celebrationColor: '#F59E0B',
      hoverScale: 1.05,
      hoverRotation: 2,
      particleCount: 8,
      storyAnimation: 'organic-flow'
    },
    excited: {
      breathingSpeed: 1.5,
      glowIntensity: 25,
      emotionalColor: '#EC4899',
      celebrationColor: '#F59E0B',
      hoverScale: 1.08,
      hoverRotation: 5,
      particleCount: 15,
      storyAnimation: 'burst-creativity'
    },
    focused: {
      breathingSpeed: 4,
      glowIntensity: 10,
      emotionalColor: '#6366F1',
      celebrationColor: '#10B981',
      hoverScale: 1.03,
      hoverRotation: 1,
      particleCount: 5,
      storyAnimation: 'precise-lines'
    }
  },
  development: {
    calm: {
      breathingSpeed: 2.5,
      glowIntensity: 12,
      emotionalColor: '#3B82F6',
      celebrationColor: '#06B6D4',
      hoverScale: 1.04,
      hoverRotation: 1,
      particleCount: 6,
      storyAnimation: 'matrix-code'
    },
    excited: {
      breathingSpeed: 1,
      glowIntensity: 20,
      emotionalColor: '#06B6D4',
      celebrationColor: '#10B981',
      hoverScale: 1.07,
      hoverRotation: 3,
      particleCount: 12,
      storyAnimation: 'code-compilation'
    },
    focused: {
      breathingSpeed: 3.5,
      glowIntensity: 8,
      emotionalColor: '#1F2937',
      celebrationColor: '#059669',
      hoverScale: 1.02,
      hoverRotation: 0.5,
      particleCount: 4,
      storyAnimation: 'terminal-focus'
    }
  },
  music: {
    calm: {
      breathingSpeed: 2,
      glowIntensity: 18,
      emotionalColor: '#7C3AED',
      celebrationColor: '#F59E0B',
      hoverScale: 1.06,
      hoverRotation: 3,
      particleCount: 10,
      storyAnimation: 'gentle-waves'
    },
    excited: {
      breathingSpeed: 0.8,
      glowIntensity: 30,
      emotionalColor: '#DC2626',
      celebrationColor: '#FBBF24',
      hoverScale: 1.1,
      hoverRotation: 8,
      particleCount: 20,
      storyAnimation: 'rhythm-burst'
    },
    focused: {
      breathingSpeed: 2.8,
      glowIntensity: 12,
      emotionalColor: '#5B21B6',
      celebrationColor: '#8B5CF6',
      hoverScale: 1.04,
      hoverRotation: 2,
      particleCount: 7,
      storyAnimation: 'harmonic-resonance'
    }
  },
  writing: {
    calm: {
      breathingSpeed: 3.5,
      glowIntensity: 14,
      emotionalColor: '#F59E0B',
      celebrationColor: '#10B981',
      hoverScale: 1.04,
      hoverRotation: 1.5,
      particleCount: 6,
      storyAnimation: 'ink-flow'
    },
    excited: {
      breathingSpeed: 2,
      glowIntensity: 22,
      emotionalColor: '#EF4444',
      celebrationColor: '#F59E0B',
      hoverScale: 1.07,
      hoverRotation: 4,
      particleCount: 14,
      storyAnimation: 'word-explosion'
    },
    focused: {
      breathingSpeed: 4,
      glowIntensity: 10,
      emotionalColor: '#92400E',
      celebrationColor: '#059669',
      hoverScale: 1.03,
      hoverRotation: 1,
      particleCount: 4,
      storyAnimation: 'focused-typing'
    }
  },
  photography: {
    calm: {
      breathingSpeed: 2.8,
      glowIntensity: 16,
      emotionalColor: '#0891B2',
      celebrationColor: '#F59E0B',
      hoverScale: 1.05,
      hoverRotation: 2,
      particleCount: 8,
      storyAnimation: 'light-capture'
    },
    excited: {
      breathingSpeed: 1.2,
      glowIntensity: 28,
      emotionalColor: '#BE185D',
      celebrationColor: '#FBBF24',
      hoverScale: 1.09,
      hoverRotation: 6,
      particleCount: 16,
      storyAnimation: 'flash-burst'
    },
    focused: {
      breathingSpeed: 3.2,
      glowIntensity: 11,
      emotionalColor: '#166534',
      celebrationColor: '#10B981',
      hoverScale: 1.03,
      hoverRotation: 1,
      particleCount: 5,
      storyAnimation: 'lens-focus'
    }
  },
  marketing: {
    calm: {
      breathingSpeed: 2.5,
      glowIntensity: 15,
      emotionalColor: '#059669',
      celebrationColor: '#F59E0B',
      hoverScale: 1.05,
      hoverRotation: 2,
      particleCount: 7,
      storyAnimation: 'growth-curve'
    },
    excited: {
      breathingSpeed: 1.3,
      glowIntensity: 25,
      emotionalColor: '#DC2626',
      celebrationColor: '#10B981',
      hoverScale: 1.08,
      hoverRotation: 5,
      particleCount: 13,
      storyAnimation: 'viral-spread'
    },
    focused: {
      breathingSpeed: 3,
      glowIntensity: 12,
      emotionalColor: '#1F2937',
      celebrationColor: '#059669',
      hoverScale: 1.04,
      hoverRotation: 1.5,
      particleCount: 6,
      storyAnimation: 'strategic-precision'
    }
  }
};

const intensityMultipliers = {
  low: {
    breathingSpeed: 1.5,
    glowIntensity: 0.7,
    hoverScale: 0.8,
    hoverRotation: 0.5,
    particleCount: 0.6
  },
  medium: {
    breathingSpeed: 1,
    glowIntensity: 1,
    hoverScale: 1,
    hoverRotation: 1,
    particleCount: 1
  },
  high: {
    breathingSpeed: 0.7,
    glowIntensity: 1.4,
    hoverScale: 1.2,
    hoverRotation: 1.5,
    particleCount: 1.5
  }
};

export const getEmotionalPreset = (
  category: string, 
  mood: string, 
  intensity: 'low' | 'medium' | 'high' = 'medium'
): EmotionalPreset => {
  const categoryKey = category.toLowerCase() as keyof typeof categoryEmotions;
  const moodKey = mood as keyof typeof categoryEmotions.design;
  
  const basePreset = categoryEmotions[categoryKey]?.[moodKey] || categoryEmotions.design.calm;
  const multiplier = intensityMultipliers[intensity];
  
  return {
    breathingSpeed: basePreset.breathingSpeed * multiplier.breathingSpeed,
    glowIntensity: basePreset.glowIntensity * multiplier.glowIntensity,
    emotionalColor: basePreset.emotionalColor,
    celebrationColor: basePreset.celebrationColor,
    hoverScale: 1 + (basePreset.hoverScale - 1) * multiplier.hoverScale,
    hoverRotation: basePreset.hoverRotation * multiplier.hoverRotation,
    particleCount: Math.floor(basePreset.particleCount * multiplier.particleCount),
    storyAnimation: basePreset.storyAnimation,
    beforeAfterTransform: getBeforeAfterTransform(category, mood)
  };
};

const getBeforeAfterTransform = (category: string, mood: string) => {
  const transforms = {
    design: {
      before: { filter: 'grayscale(100%)', transform: 'scale(0.9)' },
      after: { filter: 'grayscale(0%)', transform: 'scale(1.1)' }
    },
    development: {
      before: { opacity: 0.5, transform: 'rotateY(-10deg)' },
      after: { opacity: 1, transform: 'rotateY(0deg)' }
    },
    music: {
      before: { filter: 'blur(2px)', transform: 'scale(0.95)' },
      after: { filter: 'blur(0px)', transform: 'scale(1.05)' }
    },
    writing: {
      before: { opacity: 0.7, transform: 'translateY(10px)' },
      after: { opacity: 1, transform: 'translateY(0px)' }
    },
    photography: {
      before: { filter: 'brightness(0.7)', transform: 'scale(0.92)' },
      after: { filter: 'brightness(1.2)', transform: 'scale(1.08)' }
    },
    marketing: {
      before: { transform: 'scale(0.9) rotate(-2deg)' },
      after: { transform: 'scale(1.1) rotate(2deg)' }
    }
  };

  return transforms[category as keyof typeof transforms] || transforms.design;
};

export const getEmotionalColorPalette = (mood: string, timeOfDay: string) => {
  const palettes = {
    morning: {
      calm: ['#FEF3C7', '#F59E0B', '#D97706'],
      excited: ['#FED7D7', '#F56565', '#E53E3E'],
      focused: ['#DBEAFE', '#3B82F6', '#1D4ED8']
    },
    afternoon: {
      calm: ['#D1FAE5', '#10B981', '#059669'],
      excited: ['#FCE7F3', '#EC4899', '#BE185D'],
      focused: ['#E0E7FF', '#6366F1', '#4338CA']
    },
    evening: {
      calm: ['#E9D5FF', '#8B5CF6', '#7C3AED'],
      excited: ['#FEE2E2', '#EF4444', '#DC2626'],
      focused: ['#F3F4F6', '#6B7280', '#374151']
    },
    night: {
      calm: ['#1F2937', '#374151', '#4B5563'],
      excited: ['#312E81', '#5B21B6', '#7C2D12'],
      focused: ['#0F172A', '#1E293B', '#334155']
    }
  };

  return palettes[timeOfDay as keyof typeof palettes]?.[mood as keyof typeof palettes.morning] || palettes.afternoon.calm;
};
