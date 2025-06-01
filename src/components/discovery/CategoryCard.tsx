
import React, { useRef, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { AnimatedIcon } from './AnimatedIcons';
import SubCategoryCard from './SubCategoryCard';

gsap.registerPlugin(ScrollTrigger);

interface SubCategory {
  id: string;
  title: string;
  skillCount: number;
}

interface CategoryCardProps {
  title: string;
  iconType: string;
  skillCount: number;
  gradient: string;
  subcategories?: SubCategory[];
  onClick: () => void;
  onSubcategoryClick?: (subcategory: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  iconType,
  skillCount,
  gradient,
  subcategories = [],
  onClick,
  onSubcategoryClick
}) => {
  const { t } = useTranslation('skills');
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const subcategoriesRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleMainClick = () => {
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

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    
    if (subcategoriesRef.current) {
      if (!isExpanded) {
        gsap.fromTo(subcategoriesRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      } else {
        gsap.to(subcategoriesRef.current,
          { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" }
        );
      }
    }
  };

  const handleSubcategoryClick = (subcategoryTitle: string) => {
    if (onSubcategoryClick) {
      onSubcategoryClick(subcategoryTitle);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`${gradient} rounded-2xl cursor-pointer hover:shadow-lg transition-all duration-300 text-slate-800 relative overflow-hidden border-2 border-white/40 hover:border-white/60 shadow-md backdrop-blur-sm`}
    >
      <div onClick={handleMainClick} className="p-4">
        <div className="relative z-10">
          <div ref={iconRef} className="mb-2">
            <AnimatedIcon iconType={iconType} containerRef={iconRef} />
          </div>
          <h3 className="font-bold text-lg mb-1 text-slate-800 font-arabic">{t(`categories.${title}`)}</h3>
          <p className="text-sm opacity-90 text-slate-700 font-arabic">
            {skillCount} {t('labels.skills')}
          </p>
        </div>
        
        {/* Decorative background pattern */}
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full" />
        <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full" />
        
        {/* Inner border for extra elegance */}
        <div className="absolute inset-1 rounded-xl border border-white/30 pointer-events-none" />
      </div>

      {/* Expand/Collapse Button */}
      {subcategories.length > 0 && (
        <div className="px-4 pb-2">
          <button
            onClick={handleExpandClick}
            className="flex items-center justify-between w-full text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            <span>{isExpanded ? t('filters.hide_subcategories') : t('filters.show_subcategories')}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      )}

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div
          ref={subcategoriesRef}
          className="px-4 pb-4 overflow-hidden"
          style={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        >
          <div className="grid grid-cols-1 gap-2 mt-2">
            {subcategories.map((subcategory) => (
              <SubCategoryCard
                key={subcategory.id}
                id={subcategory.id}
                title={subcategory.title}
                skillCount={subcategory.skillCount}
                onClick={() => handleSubcategoryClick(subcategory.title)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
