
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
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current && iconRef.current) {
      // Initial card animation
      gsap.fromTo(cardRef.current,
        { scale: 0.8, opacity: 0, rotateY: -15 },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: Math.random() * 0.3
        }
      );

      // Advanced icon animations
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      
      // Floating animation
      tl.to(iconRef.current, {
        y: -8,
        duration: 2,
        ease: "power2.inOut"
      })
      .to(iconRef.current, {
        rotation: 5,
        duration: 1,
        ease: "power2.inOut"
      }, "-=1")
      .to(iconRef.current, {
        rotation: -5,
        duration: 1,
        ease: "power2.inOut"
      });

      // Pulse effect
      gsap.to(iconRef.current, {
        scale: 1.1,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2
      });

      // Hover animations
      const handleMouseEnter = () => {
        gsap.to(iconRef.current, {
          scale: 1.3,
          rotation: 360,
          duration: 0.6,
          ease: "back.out(1.7)"
        });
        
        gsap.to(cardRef.current, {
          y: -5,
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(iconRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out"
        });
        
        gsap.to(cardRef.current, {
          y: 0,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const card = cardRef.current;
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
        tl.kill();
      };
    }
  }, []);

  const handleClick = () => {
    if (cardRef.current && iconRef.current) {
      // Click animation sequence
      const clickTl = gsap.timeline();
      
      clickTl.to(cardRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.inOut"
      })
      .to(iconRef.current, {
        scale: 1.5,
        rotation: 720,
        duration: 0.3,
        ease: "back.out(1.7)"
      }, "-=0.1")
      .to(cardRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "back.out(1.7)"
      })
      .to(iconRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "elastic.out(1, 0.3)"
      }, "-=0.1");
    }
    
    setTimeout(onClick, 500);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="bg-black text-white rounded-2xl p-4 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 min-h-[120px] flex flex-col justify-between border border-gray-800 overflow-hidden relative"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 right-2 w-1 h-1 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-2 w-0.5 h-0.5 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-white/15 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div 
        ref={iconRef}
        className="text-3xl mb-2 transform-gpu relative z-10"
        style={{ 
          filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))',
          transformStyle: 'preserve-3d'
        }}
      >
        {icon}
      </div>
      
      <div className="relative z-10">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-300">{skillCount} skills</p>
      </div>
    </div>
  );
};

export default CategoryCard;
