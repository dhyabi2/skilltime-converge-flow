
import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Calendar, User } from 'lucide-react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { skillsAPI } from '../services';

interface Skill {
  id: string;
  skillTitle: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  providerName: string;
  providerImage: string;
  image: string;
  rating: number;
  reviewCount: number;
  expertise: string[];
  availableSlots: Array<{
    date: string;
    time: string;
    available: boolean;
  }>;
}

const SkillDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation('skills');
  const { t: tCommon } = useTranslation('common');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        setLoading(true);
        const skillData = await skillsAPI.getById(id);
        setSkill(skillData);
      } catch (error) {
        console.error('Error fetching skill:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSkill();
    }
  }, [id, navigate]);

  useEffect(() => {
    if (headerRef.current && !loading) {
      gsap.fromTo(headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }

    if (contentRef.current && !loading) {
      gsap.fromTo(contentRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.3
        }
      );
    }
  }, [loading]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleTimeSlotSelect = (slot: string) => {
    setSelectedTimeSlot(slot);
    // Add subtle animation feedback
    const button = document.querySelector(`[data-slot="${slot}"]`);
    if (button) {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  const handleBookNow = () => {
    if (!selectedTimeSlot) return;
    
    // Animate the book button
    gsap.to('.book-button', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => {
        navigate(`/booking/${skill.id}?slot=${selectedTimeSlot}`);
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">{tCommon('labels.loading')}</p>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">{t('status.skill_not_found')}</h1>
          <Button onClick={handleBack}>{tCommon('buttons.back')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        ref={headerRef}
        className="relative h-64 bg-gradient-to-br from-purple-600 to-blue-600"
      >
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 rtl:left-auto rtl:right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white z-10"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <img
          src={skill.image}
          alt={skill.skillTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-2xl font-bold mb-2">{skill.skillTitle}</h1>
          <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
              <span>{skill.duration}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
              <span>{skill.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="px-4 py-6 space-y-6">
        {/* Provider Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <img
              src={skill.providerImage}
              alt={skill.providerName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800">{skill.providerName}</h3>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < skill.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({skill.reviewCount} {tCommon('labels.reviews')})</span>
              </div>
            </div>
            <div className="text-right rtl:text-left">
              <div className="text-2xl font-bold text-purple-600">${skill.price}</div>
              <div className="text-sm text-gray-500">{t('details.per_hour')}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-lg text-gray-800 mb-3">{t('details.about')}</h3>
          <p className="text-gray-600 leading-relaxed mb-4">{skill.description}</p>
          
          <h4 className="font-semibold text-gray-800 mb-2">{t('details.expertise')}</h4>
          <div className="flex flex-wrap gap-2">
            {skill.expertise?.map((item) => (
              <span
                key={item}
                className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Available Time Slots */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
            {t('details.available_slots')}
          </h3>
          
          <div className="space-y-3">
            {Object.entries(
              skill.availableSlots.reduce((acc, slot) => {
                if (!acc[slot.date]) acc[slot.date] = [];
                acc[slot.date].push(slot);
                return acc;
              }, {} as Record<string, typeof skill.availableSlots>)
            ).map(([date, slots]) => (
              <div key={date}>
                <h4 className="font-medium text-gray-700 mb-2">
                  {new Date(date).toLocaleDateString('ar-SA', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={`${slot.date}-${slot.time}`}
                      data-slot={`${slot.date}-${slot.time}`}
                      onClick={() => slot.available && handleTimeSlotSelect(`${slot.date}-${slot.time}`)}
                      disabled={!slot.available}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        !slot.available
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : selectedTimeSlot === `${slot.date}-${slot.time}`
                          ? 'bg-purple-600 text-white'
                          : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book Now Button */}
        <div className="sticky bottom-4">
          <Button
            onClick={handleBookNow}
            disabled={!selectedTimeSlot}
            className="book-button w-full py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 rounded-2xl shadow-lg"
          >
            {selectedTimeSlot ? tCommon('buttons.book_now') : t('details.select_time')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkillDetail;
