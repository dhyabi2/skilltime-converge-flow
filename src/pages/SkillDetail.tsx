
import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Calendar, User } from 'lucide-react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

const SkillDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Mock data - in real app, fetch based on id
  const skill = {
    id: '1',
    providerName: 'Sarah Johnson',
    providerImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
    skillTitle: 'UI/UX Design Consultation',
    rating: 5,
    reviewCount: 47,
    price: 75,
    duration: '1 hour',
    location: 'Remote',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    description: 'Get expert guidance on your UI/UX design projects. I\'ll help you create user-centered designs that convert and delight your users. Perfect for startups and established businesses looking to improve their digital products.',
    expertise: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    availableSlots: [
      { date: '2024-06-02', time: '10:00 AM', available: true },
      { date: '2024-06-02', time: '2:00 PM', available: true },
      { date: '2024-06-02', time: '4:00 PM', available: false },
      { date: '2024-06-03', time: '9:00 AM', available: true },
      { date: '2024-06-03', time: '11:00 AM', available: true },
      { date: '2024-06-03', time: '3:00 PM', available: true },
    ]
  };

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }

    if (contentRef.current) {
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
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        ref={headerRef}
        className="relative h-64 bg-gradient-to-br from-purple-600 to-blue-600"
      >
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white z-10"
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
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{skill.duration}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{skill.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="px-4 py-6 space-y-6">
        {/* Provider Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center space-x-4">
            <img
              src={skill.providerImage}
              alt={skill.providerName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800">{skill.providerName}</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
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
                <span className="text-sm text-gray-600">({skill.reviewCount} reviews)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">${skill.price}</div>
              <div className="text-sm text-gray-500">per hour</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-lg text-gray-800 mb-3">About this skill</h3>
          <p className="text-gray-600 leading-relaxed mb-4">{skill.description}</p>
          
          <h4 className="font-semibold text-gray-800 mb-2">Expertise includes:</h4>
          <div className="flex flex-wrap gap-2">
            {skill.expertise.map((item) => (
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
            <Calendar className="w-5 h-5 mr-2" />
            Available Time Slots
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
                  {new Date(date).toLocaleDateString('en-US', { 
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
            {selectedTimeSlot ? 'Book Now' : 'Select a time slot'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkillDetail;
