
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSkillDetails } from '@/hooks/useSkillDetails';
import { useCreateBooking } from '@/hooks/useRealBookings';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import BookingDatePicker from './BookingDatePicker';
import BookingTimeSlots from './BookingTimeSlots';
import PaymentForm from './PaymentForm';
import BookingProgress from './BookingProgress';
import { paymentsService } from '@/services/supabase/payments';
import { hapticFeedback } from '@/utils/hapticFeedback';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

const EnhancedBookingCreate = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { t } = useTranslation('bookings');
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentData, setPaymentData] = useState<any>(null);
  
  const { data: skill, isLoading: skillLoading } = useSkillDetails(skillId);
  const createBooking = useCreateBooking();

  const steps = ['select_date', 'select_time', 'payment', 'confirmation'];

  // Parse pre-selected slot from URL
  useEffect(() => {
    const slot = searchParams.get('slot');
    if (slot) {
      const [date, time] = slot.split('-');
      setSelectedDate(date);
      setSelectedTime(time);
      setCurrentStep(2); // Skip to payment
    }
  }, [searchParams]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
    setCurrentStep(1);
    hapticFeedback.light();
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCurrentStep(2);
    hapticFeedback.light();
  };

  const handlePaymentSuccess = async (paymentResult: any) => {
    if (!skill || !user || !selectedDate || !selectedTime) return;

    try {
      // Create booking with payment reference
      const booking = await createBooking.mutateAsync({
        skill_id: skill.id,
        client_id: user.id,
        provider_id: skill.provider_id,
        booking_date: selectedDate,
        booking_time: selectedTime,
        price: skill.price,
        duration: skill.duration,
        location: skill.location || 'Remote',
        status: 'confirmed' // Confirmed since payment succeeded
      });

      // Confirm payment in our system
      await paymentsService.confirmPayment(paymentResult.paymentIntentId, booking.id);

      setPaymentData(paymentResult);
      setCurrentStep(3);
      hapticFeedback.success();

      toast({
        title: t('create.booking_confirmed'),
        description: t('create.success_message'),
      });

      // Navigate to success page after delay
      setTimeout(() => {
        navigate('/booking-success', {
          state: {
            booking,
            skill,
            paymentData: paymentResult
          }
        });
      }, 2000);

    } catch (error: any) {
      console.error('Booking creation failed:', error);
      hapticFeedback.error();
      
      toast({
        title: t('create.booking_failed'),
        description: error.message || t('create.error_message'),
        variant: "destructive",
      });
    }
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
    // Stay on payment step to retry
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      hapticFeedback.light();
    } else {
      navigate(-1);
    }
  };

  if (skillLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <LoadingSkeleton className="h-20 mb-6" />
          <LoadingSkeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">{t('error.skill_not_found')}</h1>
          <Button onClick={() => navigate(-1)}>{t('actions.back')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="p-2 hover:bg-white/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{t('create.title')}</h1>
            <p className="text-sm text-slate-600">{skill.title}</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <BookingProgress currentStep={currentStep} steps={steps} />

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 0 && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">{t('create.select_date_time')}</h2>
                <BookingDatePicker
                  skillId={skillId!}
                  onDateSelect={handleDateSelect}
                  selectedDate={selectedDate}
                />
              </CardContent>
            </Card>
          )}

          {currentStep === 1 && selectedDate && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">{t('time_slots.available_times')}</h2>
                <p className="text-sm text-slate-600 mb-4">
                  {new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <BookingTimeSlots
                  availableSlots={[]} // This should be fetched based on selectedDate
                  onTimeSelect={handleTimeSelect}
                  selectedTime={selectedTime}
                />
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && selectedDate && selectedTime && (
            <PaymentForm
              bookingData={{
                skillId: skill.id,
                skillTitle: skill.title,
                amount: skill.price,
                currency: 'OMR'
              }}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          )}

          {currentStep === 3 && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">
                  {t('create.booking_confirmed')}
                </h2>
                <p className="text-slate-600 mb-4">{t('create.success_message')}</p>
                <div className="animate-pulse text-sm text-slate-500">
                  {t('create.redirecting')}...
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedBookingCreate;
