import React, { useRef, useEffect } from 'react';
import { Star, Clock, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

interface SkillCardProps {
  id: string;
  providerName: string;
  providerBadge?: {
    emoji: string;
    label: string;
  };
  providerIntro?: {
    type: 'text' | 'voice';
    content: string;
  };
  skillTitle: string;
  rating: number;
  price: number;
  duration: string;
  location: string;
  image: string;
  isTopRated?: boolean;
  onClick: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({
  providerName,
  providerBadge,
  providerIntro,
  skillTitle,
  rating,
  price,
  duration,
  location,
  image,
  isTopRated,
  onClick
}) => {
  const { t } = useTranslation('common');
  const { t: tSkills } = useTranslation('skills');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
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
      className="bg-white/90 backdrop-blur-sm border border-soft-blue-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer relative"
    >
      {isTopRated && (
        <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-gradient-to-r from-soft-blue-500 to-mint-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
          {tSkills('labels.top_rated')}
        </div>
      )}
      
      <div className="relative h-40">
        <img 
          src={image} 
          alt={skillTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-slate-800 mb-1">{skillTitle}</h3>
        
        {/* Provider with Badge */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
          <p className="text-sm text-slate-600">{t('labels.by')} {providerName}</p>
          {providerBadge && (
            <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 border-purple-200">
              <span className="mr-1 rtl:mr-0 rtl:ml-1">{providerBadge.emoji}</span>
              {providerBadge.label}
            </Badge>
          )}
        </div>

        {/* Provider Intro */}
        {providerIntro && (
          <div className="mb-3 p-2 bg-slate-50 rounded-lg border-l-3 border-purple-300">
            <p className="text-xs text-slate-600 italic leading-relaxed">
              "{providerIntro.content}"
            </p>
          </div>
        )}
        
        <div className="flex items-center space-x-1 rtl:space-x-reverse mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating 
                  ? 'text-soft-blue-500 fill-current' 
                  : 'text-slate-300'
              }`}
            />
          ))}
          <span className="text-sm text-slate-600 ml-1 rtl:ml-0 rtl:mr-1">({rating})</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-soft-blue-600 to-mint-600 bg-clip-text text-transparent">{price} ر.ع</span>
          <span className="text-sm text-slate-500">{t('labels.per_hour')}</span>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
