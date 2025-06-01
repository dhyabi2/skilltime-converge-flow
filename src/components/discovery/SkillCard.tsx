
import React, { useRef, useEffect } from 'react';
import { Star, Clock, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCardProps {
  id: string;
  providerName: string;
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
  skillTitle,
  rating,
  price,
  duration,
  location,
  image,
  isTopRated,
  onClick
}) => {
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
      className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer relative"
    >
      {isTopRated && (
        <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 rounded-full text-xs font-bold z-10">
          Top Rated
        </div>
      )}
      
      <div className="relative h-40">
        <img 
          src={image} 
          alt={skillTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-1">{skillTitle}</h3>
        <p className="text-sm text-gray-600 mb-2">by {providerName}</p>
        
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating 
                  ? 'text-black fill-current' 
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">({rating})</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-black">${price}</span>
          <span className="text-sm text-gray-500">per hour</span>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
