interface BiometricData {
  mouseMovements: Array<{ x: number; y: number; timestamp: number }>;
  clickTimings: number[];
  scrollVelocities: number[];
  hoverDurations: number[];
  keyboardRhythm: number[];
}

interface AnalyzedPatterns {
  hoverDuration: number;
  clickFrequency: number;
  scrollVelocity: number;
  mouseMovementPattern: 'erratic' | 'smooth' | 'deliberate';
  stressLevel: number;
  engagementLevel: number;
  focusLevel: number;
}

export class BiometricAnalyzer {
  private data: BiometricData = {
    mouseMovements: [],
    clickTimings: [],
    scrollVelocities: [],
    hoverDurations: [],
    keyboardRhythm: []
  };

  private isTracking = false;
  private lastMousePosition = { x: 0, y: 0 };
  private lastScrollTime = 0;
  private callbacks: Array<(patterns: AnalyzedPatterns) => void> = [];

  initialize(callback: (patterns: AnalyzedPatterns) => void) {
    this.callbacks.push(callback);
    
    if (!this.isTracking) {
      this.startTracking();
      this.isTracking = true;
    }
  }

  private startTracking() {
    // Mouse movement tracking
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    
    // Click timing tracking
    document.addEventListener('click', this.handleClick.bind(this));
    
    // Scroll velocity tracking
    document.addEventListener('scroll', this.handleScroll.bind(this));
    
    // Hover duration tracking
    document.addEventListener('mouseenter', this.handleMouseEnter.bind(this), true);
    document.addEventListener('mouseleave', this.handleMouseLeave.bind(this), true);
    
    // Keyboard rhythm tracking
    document.addEventListener('keydown', this.handleKeyDown.bind(this));

    // Analyze patterns every 2 seconds
    setInterval(() => {
      this.analyzePatterns();
    }, 2000);
  }

  private handleMouseMove(event: MouseEvent) {
    const now = Date.now();
    const movement = {
      x: event.clientX,
      y: event.clientY,
      timestamp: now
    };

    this.data.mouseMovements.push(movement);
    
    // Keep only last 50 movements
    if (this.data.mouseMovements.length > 50) {
      this.data.mouseMovements = this.data.mouseMovements.slice(-50);
    }

    this.lastMousePosition = { x: event.clientX, y: event.clientY };
  }

  private handleClick(event: MouseEvent) {
    this.data.clickTimings.push(Date.now());
    
    // Keep only last 20 clicks
    if (this.data.clickTimings.length > 20) {
      this.data.clickTimings = this.data.clickTimings.slice(-20);
    }
  }

  private handleScroll(event: Event) {
    const now = Date.now();
    if (this.lastScrollTime > 0) {
      const velocity = Math.abs(window.scrollY - (event.target as any).scrollTop) / (now - this.lastScrollTime);
      this.data.scrollVelocities.push(velocity);
      
      // Keep only last 20 scroll events
      if (this.data.scrollVelocities.length > 20) {
        this.data.scrollVelocities = this.data.scrollVelocities.slice(-20);
      }
    }
    this.lastScrollTime = now;
  }

  private hoverStartTime = 0;

  private handleMouseEnter(event: MouseEvent) {
    this.hoverStartTime = Date.now();
  }

  private handleMouseLeave(event: MouseEvent) {
    if (this.hoverStartTime > 0) {
      const duration = Date.now() - this.hoverStartTime;
      this.data.hoverDurations.push(duration);
      
      // Keep only last 20 hover events
      if (this.data.hoverDurations.length > 20) {
        this.data.hoverDurations = this.data.hoverDurations.slice(-20);
      }
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    this.data.keyboardRhythm.push(Date.now());
    
    // Keep only last 30 keystrokes
    if (this.data.keyboardRhythm.length > 30) {
      this.data.keyboardRhythm = this.data.keyboardRhythm.slice(-30);
    }
  }

  private analyzePatterns(): AnalyzedPatterns {
    const patterns: AnalyzedPatterns = {
      hoverDuration: this.calculateAverageHoverDuration(),
      clickFrequency: this.calculateClickFrequency(),
      scrollVelocity: this.calculateAverageScrollVelocity(),
      mouseMovementPattern: this.analyzeMouseMovementPattern(),
      stressLevel: this.calculateStressLevel(),
      engagementLevel: this.calculateEngagementLevel(),
      focusLevel: this.calculateFocusLevel()
    };

    // Notify all callbacks
    this.callbacks.forEach(callback => callback(patterns));

    return patterns;
  }

  private calculateAverageHoverDuration(): number {
    if (this.data.hoverDurations.length === 0) return 0;
    return this.data.hoverDurations.reduce((a, b) => a + b, 0) / this.data.hoverDurations.length;
  }

  private calculateClickFrequency(): number {
    if (this.data.clickTimings.length < 2) return 0;
    
    const timeDiff = this.data.clickTimings[this.data.clickTimings.length - 1] - this.data.clickTimings[0];
    return (this.data.clickTimings.length - 1) / (timeDiff / 1000); // clicks per second
  }

  private calculateAverageScrollVelocity(): number {
    if (this.data.scrollVelocities.length === 0) return 0;
    return this.data.scrollVelocities.reduce((a, b) => a + b, 0) / this.data.scrollVelocities.length;
  }

  private analyzeMouseMovementPattern(): 'erratic' | 'smooth' | 'deliberate' {
    if (this.data.mouseMovements.length < 5) return 'smooth';
    
    let totalDistance = 0;
    let directionChanges = 0;
    let lastDirection = { x: 0, y: 0 };

    for (let i = 1; i < this.data.mouseMovements.length; i++) {
      const prev = this.data.mouseMovements[i - 1];
      const curr = this.data.mouseMovements[i];
      
      const distance = Math.sqrt(
        Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2)
      );
      totalDistance += distance;

      const direction = {
        x: curr.x - prev.x,
        y: curr.y - prev.y
      };

      if (i > 1) {
        const angleChange = Math.abs(
          Math.atan2(direction.y, direction.x) - Math.atan2(lastDirection.y, lastDirection.x)
        );
        if (angleChange > Math.PI / 4) { // 45 degrees
          directionChanges++;
        }
      }

      lastDirection = direction;
    }

    const averageDistance = totalDistance / this.data.mouseMovements.length;
    const changeRatio = directionChanges / this.data.mouseMovements.length;

    if (changeRatio > 0.3 && averageDistance > 20) return 'erratic';
    if (changeRatio < 0.1 && averageDistance < 10) return 'deliberate';
    return 'smooth';
  }

  private calculateStressLevel(): number {
    let stressIndicators = 0;
    
    // High click frequency indicates stress
    if (this.calculateClickFrequency() > 2) stressIndicators++;
    
    // Erratic mouse movements indicate stress
    if (this.analyzeMouseMovementPattern() === 'erratic') stressIndicators++;
    
    // Very short hover durations indicate impatience/stress
    const avgHover = this.calculateAverageHoverDuration();
    if (avgHover > 0 && avgHover < 300) stressIndicators++;
    
    // High scroll velocity indicates rushing/stress
    if (this.calculateAverageScrollVelocity() > 100) stressIndicators++;

    return Math.min(stressIndicators / 4, 1); // Normalize to 0-1
  }

  private calculateEngagementLevel(): number {
    let engagementIndicators = 0;
    
    // Moderate click frequency indicates engagement
    const clickFreq = this.calculateClickFrequency();
    if (clickFreq > 0.1 && clickFreq < 1.5) engagementIndicators++;
    
    // Longer hover durations indicate engagement
    const avgHover = this.calculateAverageHoverDuration();
    if (avgHover > 1000) engagementIndicators++;
    
    // Smooth mouse movements indicate engagement
    if (this.analyzeMouseMovementPattern() === 'smooth') engagementIndicators++;
    
    // Moderate scroll velocity indicates engaged reading
    const scrollVel = this.calculateAverageScrollVelocity();
    if (scrollVel > 10 && scrollVel < 50) engagementIndicators++;

    return Math.min(engagementIndicators / 4, 1);
  }

  private calculateFocusLevel(): number {
    let focusIndicators = 0;
    
    // Deliberate mouse movements indicate focus
    if (this.analyzeMouseMovementPattern() === 'deliberate') focusIndicators++;
    
    // Long hover durations indicate focus
    const avgHover = this.calculateAverageHoverDuration();
    if (avgHover > 2000) focusIndicators++;
    
    // Low click frequency indicates focus
    if (this.calculateClickFrequency() < 0.5) focusIndicators++;
    
    // Consistent scroll velocity indicates focus
    const scrollVels = this.data.scrollVelocities;
    if (scrollVels.length > 3) {
      const variance = this.calculateVariance(scrollVels);
      if (variance < 100) focusIndicators++;
    }

    return Math.min(focusIndicators / 4, 1);
  }

  private calculateVariance(numbers: number[]): number {
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const squaredDiffs = numbers.map(num => Math.pow(num - mean, 2));
    return squaredDiffs.reduce((a, b) => a + b, 0) / numbers.length;
  }

  destroy() {
    this.isTracking = false;
    document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    document.removeEventListener('click', this.handleClick.bind(this));
    document.removeEventListener('scroll', this.handleScroll.bind(this));
    document.removeEventListener('mouseenter', this.handleMouseEnter.bind(this), true);
    document.removeEventListener('mouseleave', this.handleMouseLeave.bind(this), true);
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }
}
