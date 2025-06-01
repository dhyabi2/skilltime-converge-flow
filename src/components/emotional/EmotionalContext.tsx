
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BiometricAnalyzer } from './BiometricAnalyzer';
import { MoodDetector } from './MoodDetector';

interface EmotionalState {
  userMood: 'calm' | 'excited' | 'focused' | 'stressed' | 'happy' | 'contemplative';
  emotionalPreferences: {
    intensity: 'low' | 'medium' | 'high';
    colorPreference: 'warm' | 'cool' | 'vibrant' | 'neutral';
    animationSpeed: 'slow' | 'normal' | 'fast';
    reducedMotion: boolean;
  };
  interactionPatterns: {
    hoverDuration: number;
    clickFrequency: number;
    scrollVelocity: number;
    mouseMovementPattern: 'erratic' | 'smooth' | 'deliberate';
  };
  contextualState: {
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    sessionDuration: number;
    currentPhase: 'discovery' | 'consideration' | 'decision' | 'booking';
  };
}

interface EmotionalContextType extends EmotionalState {
  updateMood: (mood: EmotionalState['userMood']) => void;
  updatePreferences: (preferences: Partial<EmotionalState['emotionalPreferences']>) => void;
  updateInteractionPattern: (pattern: Partial<EmotionalState['interactionPatterns']>) => void;
  updateContextualState: (state: Partial<EmotionalState['contextualState']>) => void;
  triggerEmotionalResponse: (emotion: string, intensity?: number) => void;
}

const EmotionalContext = createContext<EmotionalContextType | undefined>(undefined);

interface EmotionalProviderProps {
  children: ReactNode;
}

export const EmotionalProvider: React.FC<EmotionalProviderProps> = ({ children }) => {
  const [emotionalState, setEmotionalState] = useState<EmotionalState>({
    userMood: 'calm',
    emotionalPreferences: {
      intensity: 'medium',
      colorPreference: 'neutral',
      animationSpeed: 'normal',
      reducedMotion: false
    },
    interactionPatterns: {
      hoverDuration: 0,
      clickFrequency: 0,
      scrollVelocity: 0,
      mouseMovementPattern: 'smooth'
    },
    contextualState: {
      timeOfDay: 'afternoon',
      sessionDuration: 0,
      currentPhase: 'discovery'
    }
  });

  const biometricAnalyzer = new BiometricAnalyzer();
  const moodDetector = new MoodDetector();

  useEffect(() => {
    // Initialize emotion detection
    const initializeEmotionDetection = () => {
      // Time of day detection
      const hour = new Date().getHours();
      let timeOfDay: EmotionalState['contextualState']['timeOfDay'];
      if (hour < 12) timeOfDay = 'morning';
      else if (hour < 17) timeOfDay = 'afternoon';
      else if (hour < 21) timeOfDay = 'evening';
      else timeOfDay = 'night';

      updateContextualState({ timeOfDay });

      // Session duration tracking
      const sessionStart = Date.now();
      const interval = setInterval(() => {
        const duration = Date.now() - sessionStart;
        updateContextualState({ sessionDuration: duration });
      }, 1000);

      return () => clearInterval(interval);
    };

    const cleanup = initializeEmotionDetection();

    // Biometric analysis setup
    biometricAnalyzer.initialize((patterns) => {
      updateInteractionPattern(patterns);
      
      // Detect mood based on patterns
      const detectedMood = moodDetector.analyzeMood(patterns);
      if (detectedMood !== emotionalState.userMood) {
        updateMood(detectedMood);
      }
    });

    return cleanup;
  }, []);

  const updateMood = (mood: EmotionalState['userMood']) => {
    setEmotionalState(prev => ({ ...prev, userMood: mood }));
    console.log('Mood updated to:', mood);
  };

  const updatePreferences = (preferences: Partial<EmotionalState['emotionalPreferences']>) => {
    setEmotionalState(prev => ({
      ...prev,
      emotionalPreferences: { ...prev.emotionalPreferences, ...preferences }
    }));
  };

  const updateInteractionPattern = (pattern: Partial<EmotionalState['interactionPatterns']>) => {
    setEmotionalState(prev => ({
      ...prev,
      interactionPatterns: { ...prev.interactionPatterns, ...pattern }
    }));
  };

  const updateContextualState = (state: Partial<EmotionalState['contextualState']>) => {
    setEmotionalState(prev => ({
      ...prev,
      contextualState: { ...prev.contextualState, ...state }
    }));
  };

  const triggerEmotionalResponse = (emotion: string, intensity: number = 1) => {
    console.log(`Emotional response triggered: ${emotion} (intensity: ${intensity})`);
    
    // Update mood based on emotional response
    switch (emotion) {
      case 'excited':
      case 'celebrating':
        updateMood('excited');
        break;
      case 'contemplating':
      case 'considering':
        updateMood('contemplative');
        break;
      case 'stressed':
      case 'frustrated':
        updateMood('stressed');
        break;
      case 'focused':
        updateMood('focused');
        break;
      default:
        updateMood('calm');
    }
  };

  const value: EmotionalContextType = {
    ...emotionalState,
    updateMood,
    updatePreferences,
    updateInteractionPattern,
    updateContextualState,
    triggerEmotionalResponse
  };

  return (
    <EmotionalContext.Provider value={value}>
      {children}
    </EmotionalContext.Provider>
  );
};

export const useEmotionalContext = () => {
  const context = useContext(EmotionalContext);
  if (context === undefined) {
    throw new Error('useEmotionalContext must be used within an EmotionalProvider');
  }
  return context;
};
