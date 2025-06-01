
import React, { useRef, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, User, CreditCard } from 'lucide-react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

const BookingConfirmation = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const slot = searchParams.get('slot');
  const containerRef = useRef<HTMLDivElement>(null);
  const checkmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  const handleViewBookings = () => {
    navigate('/bookings');
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div
            ref={checkmarkRef}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-4"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your session has been successfully booked</p>
        </div>

        {/* Booking Details */}
        <div ref={containerRef} className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="font-bold text-lg text-gray-800 mb-4">Booking Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">UI/UX Design Consultation</p>
                  <p className="text-sm text-gray-600">with Sarah Johnson</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">June 2, 2024</p>
                  <p className="text-sm text-gray-600">Tomorrow</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">10:00 AM - 11:00 AM</p>
                  <p className="text-sm text-gray-600">1 hour session</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">$75.00</p>
                  <p className="text-sm text-gray-600">Payment confirmed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-lg text-gray-800 mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>You'll receive a confirmation email with session details</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Meeting link will be shared 15 minutes before the session</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>You can reschedule or cancel up to 24 hours before</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleViewBookings}
              className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-2xl"
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
