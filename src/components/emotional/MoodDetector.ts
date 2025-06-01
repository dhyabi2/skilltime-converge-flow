interface AnalyzedPatterns {
  hoverDuration: number;
  clickFrequency: number;
  scrollVelocity: number;
  mouseMovementPattern: 'erratic' | 'smooth' | 'deliberate';
  stressLevel: number;
  engagementLevel: number;
  focusLevel: number;
}

type MoodType = 'calm' | 'excited' | 'focused' | 'stressed' | 'happy' | 'contemplative';

export class MoodDetector {
  private moodHistory: Array<{ mood: MoodType; timestamp: number; confidence: number }> = [];

  analyzeMood(patterns: AnalyzedPatterns): MoodType {
    const moodScores = {
      calm: 0,
      excited: 0,
      focused: 0,
      stressed: 0,
      happy: 0,
      contemplative: 0
    };

    // Stress detection
    if (patterns.stressLevel > 0.7) {
      moodScores.stressed += patterns.stressLevel * 100;
    }
    
    if (patterns.mouseMovementPattern === 'erratic') {
      moodScores.stressed += 30;
    }
    
    if (patterns.clickFrequency > 2) {
      moodScores.stressed += 25;
    }

    // Focus detection
    if (patterns.focusLevel > 0.7) {
      moodScores.focused += patterns.focusLevel * 100;
    }
    
    if (patterns.mouseMovementPattern === 'deliberate') {
      moodScores.focused += 40;
    }
    
    if (patterns.hoverDuration > 3000) {
      moodScores.focused += 30;
      moodScores.contemplative += 20;
    }

    // Excitement detection
    if (patterns.engagementLevel > 0.8 && patterns.stressLevel < 0.3) {
      moodScores.excited += 50;
    }
    
    if (patterns.clickFrequency > 1 && patterns.clickFrequency < 2) {
      moodScores.excited += 30;
    }
    
    if (patterns.scrollVelocity > 50 && patterns.scrollVelocity < 100) {
      moodScores.excited += 25;
    }

    // Contemplative detection
    if (patterns.hoverDuration > 2000 && patterns.clickFrequency < 0.3) {
      moodScores.contemplative += 60;
    }
    
    if (patterns.mouseMovementPattern === 'smooth' && patterns.scrollVelocity < 30) {
      moodScores.contemplative += 30;
    }

    // Happy detection (combination of moderate engagement and low stress)
    if (patterns.engagementLevel > 0.6 && patterns.stressLevel < 0.2) {
      moodScores.happy += 40;
    }
    
    if (patterns.mouseMovementPattern === 'smooth' && patterns.hoverDuration > 1000 && patterns.hoverDuration < 3000) {
      moodScores.happy += 35;
    }

    // Calm detection (baseline)
    if (patterns.stressLevel < 0.3 && patterns.engagementLevel > 0.3 && patterns.engagementLevel < 0.7) {
      moodScores.calm += 50;
    }
    
    if (patterns.mouseMovementPattern === 'smooth' && patterns.clickFrequency < 1) {
      moodScores.calm += 30;
    }

    // Time-based adjustments
    const timeOfDay = this.getTimeOfDay();
    this.applyTimeOfDayAdjustments(moodScores, timeOfDay);

    // Historical mood influence
    this.applyMoodMomentum(moodScores);

    // Find highest scoring mood
    const detectedMood = Object.entries(moodScores).reduce((a, b) => 
      moodScores[a[0] as keyof typeof moodScores] > moodScores[b[0] as keyof typeof moodScores] ? a : b
    )[0] as MoodType;

    const confidence = this.calculateConfidence(moodScores, detectedMood);
    
    // Only update mood if confidence is high enough
    if (confidence > 0.6) {
      this.moodHistory.push({
        mood: detectedMood,
        timestamp: Date.now(),
        confidence
      });

      // Keep only last 10 mood detections
      if (this.moodHistory.length > 10) {
        this.moodHistory = this.moodHistory.slice(-10);
      }
    }

    return detectedMood;
  }

  private getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    if (hour < 21) return 'evening';
    return 'night';
  }

  private applyTimeOfDayAdjustments(moodScores: Record<MoodType, number>, timeOfDay: string) {
    switch (timeOfDay) {
      case 'morning':
        moodScores.excited += 15;
        moodScores.focused += 10;
        moodScores.calm -= 5;
        break;
      case 'afternoon':
        moodScores.focused += 15;
        moodScores.stressed += 10;
        break;
      case 'evening':
        moodScores.calm += 15;
        moodScores.contemplative += 10;
        moodScores.excited -= 10;
        break;
      case 'night':
        moodScores.contemplative += 20;
        moodScores.calm += 10;
        moodScores.excited -= 15;
        moodScores.stressed += 5;
        break;
    }
  }

  private applyMoodMomentum(moodScores: Record<MoodType, number>) {
    if (this.moodHistory.length === 0) return;

    // Get recent mood trend
    const recentMoods = this.moodHistory.slice(-3);
    const moodCounts: Partial<Record<MoodType, number>> = {};

    recentMoods.forEach(entry => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + entry.confidence;
    });

    // Apply momentum boost to consistent moods
    Object.entries(moodCounts).forEach(([mood, count]) => {
      if (count && count > 1.5) {
        moodScores[mood as MoodType] += Math.min(count * 10, 30);
      }
    });
  }

  private calculateConfidence(moodScores: Record<MoodType, number>, detectedMood: MoodType): number {
    const scores = Object.values(moodScores);
    const maxScore = moodScores[detectedMood];
    const secondHighest = scores.sort((a, b) => b - a)[1] || 0;
    
    if (maxScore === 0) return 0;
    
    // Confidence is higher when there's a clear winner
    const separation = (maxScore - secondHighest) / maxScore;
    const magnitude = Math.min(maxScore / 100, 1);
    
    return Math.min(separation * magnitude, 1);
  }

  getMoodHistory(): Array<{ mood: MoodType; timestamp: number; confidence: number }> {
    return [...this.moodHistory];
  }

  getCurrentMoodTrend(): { mood: MoodType; confidence: number } | null {
    if (this.moodHistory.length === 0) return null;
    
    const recent = this.moodHistory.slice(-3);
    const moodCounts: Partial<Record<MoodType, { count: number; totalConfidence: number }>> = {};
    
    recent.forEach(entry => {
      if (!moodCounts[entry.mood]) {
        moodCounts[entry.mood] = { count: 0, totalConfidence: 0 };
      }
      moodCounts[entry.mood]!.count++;
      moodCounts[entry.mood]!.totalConfidence += entry.confidence;
    });
    
    const trendingMood = Object.entries(moodCounts).reduce((a, b) => 
      (a[1]?.count || 0) > (b[1]?.count || 0) ? a : b
    );
    
    if (!trendingMood[1]) return null;
    
    return {
      mood: trendingMood[0] as MoodType,
      confidence: trendingMood[1].totalConfidence / trendingMood[1].count
    };
  }
}
