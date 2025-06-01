
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

interface SubCategoryCardProps {
  id: string;
  title: string;
  skillCount: number;
  onClick: () => void;
}

const SubCategoryCard: React.FC<SubCategoryCardProps> = ({
  title,
  skillCount,
  onClick
}) => {
  const { t } = useTranslation('skills');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 95%",
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
      className="bg-white/70 backdrop-blur-sm rounded-xl p-3 cursor-pointer hover:bg-white/90 transition-all duration-300 border border-soft-blue-100 hover:border-soft-blue-300 shadow-sm hover:shadow-md"
    >
      <h4 className="font-semibold text-sm text-slate-800 mb-1">{t(`subcategories.${title}`)}</h4>
      <p className="text-xs text-slate-600">
        {skillCount} {t('labels.skills')}
      </p>
    </div>
  );
};

export default SubCategoryCard;
