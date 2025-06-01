
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { AnimatedIcon } from './AnimatedIcons';

gsap.registerPlugin(ScrollTrigger);

interface CategoryCardProps {
  title: string;
  iconType: string;
  skillCount: number;
  gradient: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  iconType,
  skillCount,
  gradient,
  onClick
}) => {
  const { t } = useTranslation('skills');
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const handleClick = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.95,
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
      className={`${gradient} rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-all duration-300 text-black relative overflow-hidden border-2 border-white/30 hover:border-white/50 shadow-md`}
    >
      <div className="relative z-10">
        <div ref={iconRef} className="mb-2">
          <AnimatedIcon iconType={iconType} containerRef={iconRef} />
        </div>
        <h3 className="font-bold text-lg mb-1 text-black font-arabic">{t(`categories.${title}`)}</h3>
        <p className="text-sm opacity-90 text-black font-arabic">
          {skillCount} {t('labels.skills', { count: skillCount })}
        </p>
      </div>
      
      {/* Decorative background pattern */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
      <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/5 rounded-full" />
      
      {/* Inner border for extra elegance */}
      <div className="absolute inset-1 rounded-xl border border-white/20 pointer-events-none" />
    </div>
  );
};

export default CategoryCard;
