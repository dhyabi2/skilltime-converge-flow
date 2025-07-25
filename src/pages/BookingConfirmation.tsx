
import React, { useRef, useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, User, CreditCard } from 'lucide-react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { bookingsAPI, skillsAPI } from '../services';

const BookingConfirmation = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const slot = searchParams.get('slot');
  const [booking, setBooking] = useState(null);
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const checkmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createBooking = async () => {
      try {
        setLoading(true);
        
        // Fetch skill details
        const skillData = await skillsAPI.getById(id);
        setSkill(skillData);
        
        // Create booking
        const [date, time] = slot.split('-');
        const bookingData = await bookingsAPI.create({
          skillId: id,
          skillTitle: skillData.skillTitle,
          providerName: skillData.providerName,
          date,
          time,
          duration: skillData.duration,
          price: skillData.price
        });
        
        setBooking(bookingData);
      } catch (error) {
        console.error('Error creating booking:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (id && slot) {
      createBooking();
    }
  }, [id, slot, navigate]);

  useEffect(() => {
    if (!loading && booking) {
      // Animate the success checkmark
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
      if (containerRef.current) {
        gsap.fromTo(containerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.6
          }
        );
      }
    }
  }, [loading, booking]);

  const handleViewBookings = () => {
    navigate('/bookings');
  };

  const handleBackHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Confirming your booking...</p>
        </div>
      </div>
    );
  }

  if (!booking || !skill) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Booking failed</h1>
          <Button onClick={handleBackHome}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div
            ref={checkmarkRef}
            className="inline-flex items-center justify-center w-24 h-24 bg-black rounded-full mb-4"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your session has been successfully booked</p>
        </div>

        {/* Booking Details */}
        <div ref={containerRef} className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="font-bold text-lg text-black mb-4">Booking Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="font-medium text-black">{booking.skillTitle}</p>
                  <p className="text-sm text-gray-600">with {booking.providerName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="font-medium text-black">
                    {new Date(booking.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-600">Upcoming session</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="font-medium text-black">{booking.time}</p>
                  <p className="text-sm text-gray-600">{booking.duration} session</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="font-medium text-black">{booking.price} ر.ع</p>
                  <p className="text-sm text-gray-600">Payment confirmed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-bold text-lg text-black mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
                <span>You'll receive a confirmation email with session details</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
                <span>Meeting link will be shared 15 minutes before the session</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
                <span>You can reschedule or cancel up to 24 hours before</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleViewBookings}
              className="w-full py-4 text-lg font-semibold bg-black hover:bg-gray-800 text-white rounded-2xl"
            >
              View My Bookings
            </Button>
            <Button
              onClick={handleBackHome}
              variant="outline"
              className="w-full py-4 text-lg font-semibold border-2 border-gray-300 rounded-2xl"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
