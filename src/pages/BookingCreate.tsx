
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, CreditCard, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import BookingServiceCard from '@/components/booking/BookingServiceCard';
import BookingDatePicker from '@/components/booking/BookingDatePicker';
import BookingTimeSlots from '@/components/booking/BookingTimeSlots';
import BookingSummary from '@/components/booking/BookingSummary';

// Dummy data for services
const dummyServices = [
  {
    id: '1',
    title: 'UI/UX Design Consultation',
    provider: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
    rating: 4.9,
    reviews: 127,
    price: 75,
    duration: 60,
    description: 'Professional UI/UX design consultation to improve your product'
  },
  {
    id: '2', 
    title: 'React Development',
    provider: 'Mike Chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    rating: 4.8,
    reviews: 89,
    price: 100,
    duration: 120,
    description: 'Expert React development and code review session'
  }
];

// Dummy time slots
const dummyTimeSlots = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
];

const BookingCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation('bookings');
  
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(60);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setDuration(service.duration);
    setCurrentStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (selectedTime) {
      setCurrentStep(3);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    if (selectedDate) {
      setCurrentStep(3);
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      toast({
        title: t('create.missing_info'),
        description: t('create.complete_details'),
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: t('create.booking_confirmed'),
        description: t('create.success_message'),
      });
      
      // Navigate to confirmation page
      navigate(`/booking/confirmation`);
    } catch (error) {
      toast({
        title: t('create.booking_failed'),
        description: t('create.error_message'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;
    const basePrice = selectedService.price;
    const durationMultiplier = duration / 60;
    return Math.round(basePrice * durationMultiplier);
  };

  const canProceed = selectedService && selectedDate && selectedTime;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{t('create.title')}</h1>
            <p className="text-sm text-gray-600">{t('create.step_of', { current: currentStep, total: 3 })}</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 flex gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-1 rounded-full transition-colors ${
                step <= currentStep ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">{t('create.choose_service')}</h2>
            <div className="space-y-3">
              {dummyServices.map((service) => (
                <BookingServiceCard
                  key={service.id}
                  service={service}
                  isSelected={selectedService?.id === service.id}
                  onSelect={() => handleServiceSelect(service)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Selection */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">{t('create.select_date_time')}</h2>
            
            <BookingDatePicker
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
            
            {selectedDate && (
              <BookingTimeSlots
                availableSlots={dummyTimeSlots}
                selectedTime={selectedTime}
                onTimeSelect={handleTimeSelect}
                selectedDate={selectedDate}
              />
            )}
          </div>
        )}

        {/* Step 3: Summary & Confirmation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">{t('create.summary')}</h2>
            
            <BookingSummary
              service={selectedService}
              date={selectedDate}
              time={selectedTime}
              duration={duration}
              total={calculateTotal()}
            />

            <Button
              onClick={handleConfirmBooking}
              disabled={!canProceed || loading}
              className="w-full h-12 text-base"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t('create.confirming')}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  {t('create.confirm_booking')} - ${calculateTotal()}
                </div>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCreate;
