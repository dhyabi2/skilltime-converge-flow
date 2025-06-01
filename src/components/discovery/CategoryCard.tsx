
import React, { useRef, useEffect } from 'react';
import { AnimatedIcon } from './AnimatedIcons';
import { setupCardAnimations, setupClickAnimation } from './CategoryCardAnimations';

interface CategoryCardProps {
  title: string;
  icon: string;
  skillCount: number;
  gradient: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  icon, 
  skillCount, 
  onClick 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = setupCardAnimations(cardRef, iconContainerRef);
    return cleanup;
  }, []);

  const handleClick = () => {
    setupClickAnimation(cardRef, iconContainerRef, onClick);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="bg-white text-black rounded-2xl p-4 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 min-h-[120px] flex flex-col justify-between border border-gray-200 overflow-hidden relative"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 right-2 w-1 h-1 bg-black/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-2 w-0.5 h-0.5 bg-black/5 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-black/8 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div 
        ref={iconContainerRef}
        className="mb-2 transform-gpu relative z-10 flex justify-center"
        style={{ 
          filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.1))',
          transformStyle: 'preserve-3d'
        }}
      >
        <AnimatedIcon iconType={icon} containerRef={iconContainerRef} />
      </div>
      
      <div className="relative z-10">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{skillCount} skills</p>
      </div>
    </div>
  );
};

export default CategoryCard;
