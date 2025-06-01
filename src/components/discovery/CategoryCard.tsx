
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

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

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          delay: Math.random() * 0.3
        }
      );
    }
  }, []);

  const handleClick = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.05,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
    setTimeout(onClick, 200);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="bg-black text-white rounded-2xl p-4 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 min-h-[120px] flex flex-col justify-between border border-gray-800"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-300">{skillCount} skills</p>
      </div>
    </div>
  );
};

export default CategoryCard;
