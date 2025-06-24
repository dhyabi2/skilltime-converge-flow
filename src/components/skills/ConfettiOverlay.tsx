
import React from 'react';
import { Star, Trophy } from 'lucide-react';

interface ConfettiOverlayProps {
  show: boolean;
}

const ConfettiOverlay: React.FC<ConfettiOverlayProps> = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center animate-scale-in">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-2">Congratulations!</h2>
          <p className="text-xl text-white/90">Your skill has been created successfully!</p>
          <div className="flex justify-center gap-2 mt-4">
            <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
            <Trophy className="w-6 h-6 text-yellow-400 animate-bounce" />
            <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
        </div>
      </div>
      {/* Floating confetti elements */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-3 h-3 bg-gradient-to-r from-mint-400 to-soft-blue-400 rounded-full animate-ping`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiOverlay;
