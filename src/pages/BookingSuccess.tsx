
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, User, Home, Eye } from 'lucide-react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { hapticFeedback } from '@/utils/hapticFeedback';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('bookings');
  const checkmarkRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { booking, skill } = location.state || {};

  console.log('BookingSuccess page loaded with:', { booking, skill, locationState: location.state });

  useEffect(() => {
    // Redirect if no booking data (shouldn't happen in normal flow)
    if (!booking || !skill) {
      console.warn('No booking data found, redirecting to home');
      navigate('/home');
      return;
    }

    hapticFeedback.success();

    // Animate checkmark
    if (checkmarkRef.current) {
      gsap.fromTo(checkmarkRef.current,
        { scale: 0, rotation: -180 },
        { 
          scale: 1, 
          rotation: 0, 
          duration: 0.8, 
          ease: "back.out(1.7)",
          delay: 0.3 
        }
      );
    }

    // Animate content
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.8
        }
      );
    }
  }, [booking, skill, navigate]);

  const handleViewBookings = () => {
    hapticFeedback.light();
    navigate('/bookings');
  };

  const handleBackHome = () => {
    hapticFeedback.light();
    navigate('/home');
  };

  if (!booking || !skill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">{t('status.loading')}</h1>
          <p className="text-slate-600">{t('create.redirecting')}</p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(booking.booking_date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedTime = new Date(`2000-01-01T${booking.booking_time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div
            ref={checkmarkRef}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-mint-500 rounded-full mb-4 shadow-lg"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {t('success.title')}
          </h1>
          <p className="text-slate-600">{t('success.subtitle')}</p>
        </div>

        {/* Booking Details */}
        <div ref={contentRef} className="space-y-4">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              <h2 className="font-bold text-lg text-slate-800 mb-4">
                {t('success.booking_details')}
              </h2>
              
              <div className="space-y-4">
                {/* Service */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{skill.title}</p>
                    <p className="text-sm text-slate-600">{t('service_card.with')} {skill.profiles?.name || t('service_card.provider')}</p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{formattedDate}</p>
                    <p className="text-sm text-slate-600">{t('summary.session_date')}</p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-100 to-teal-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{formattedTime}</p>
                    <p className="text-sm text-slate-600">{booking.duration} {t('summary.session')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg text-slate-800 mb-3">{t('success.whats_next')}</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-soft-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{t('success.next_steps.email')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-soft-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{t('success.next_steps.meeting_link')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-soft-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{t('success.next_steps.reschedule')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleViewBookings}
              className="w-full h-12 bg-gradient-to-r from-soft-blue-600 to-mint-600 hover:from-soft-blue-700 hover:to-mint-700 text-white font-semibold rounded-xl shadow-lg border-0"
            >
              <Eye className="w-4 h-4 mr-2" />
              {t('success.view_bookings')}
            </Button>
            <Button
              onClick={handleBackHome}
              variant="outline"
              className="w-full h-12 bg-white/50 hover:bg-white/80 border-slate-200 text-slate-700 font-semibold rounded-xl"
            >
              <Home className="w-4 h-4 mr-2" />
              {t('success.back_home')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
