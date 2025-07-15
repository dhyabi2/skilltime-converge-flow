
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Check, Calendar, Clock, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSkillDetails } from '@/hooks/useSkillDetails';
import { useCreateBooking } from '@/hooks/useRealBookings';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import BookingDatePicker from './BookingDatePicker';
import BookingTimeSlots from './BookingTimeSlots';
import BookingProgress from './BookingProgress';
import { hapticFeedback } from '@/utils/hapticFeedback';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

const FreeBookingCreate = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { t } = useTranslation('bookings');
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(0);
  const [notes, setNotes] = useState<string>('');
  
  const { data: skill, isLoading: skillLoading } = useSkillDetails(skillId);
  const createBooking = useCreateBooking();

  const steps = ['select_date', 'select_time', 'confirmation'];

  // Parse pre-selected slot from URL
  useEffect(() => {
    const slot = searchParams.get('slot');
    if (slot) {
      const [date, time] = slot.split('-');
      setSelectedDate(date);
      setSelectedTime(time);
      setCurrentStep(2); // Skip to confirmation
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

  const handleConfirmBooking = async () => {
    if (!skill || !user || !selectedDate || !selectedTime) return;

    try {
      const booking = await createBooking.mutateAsync({
        skill_id: skill.id,
        client_id: user.id,
        provider_id: skill.provider_id,
        booking_date: selectedDate,
        booking_time: selectedTime,
        price: skill.price,
        duration: skill.duration,
        location: skill.location || 'Remote',
        status: 'pending',
        notes: notes || undefined
      });

      hapticFeedback.success();

      toast({
        title: t('create.booking_confirmed'),
        description: t('create.success_message'),
      });

      // Navigate to success page
      navigate('/booking-success', {
        state: {
          booking,
          skill
        }
      });

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
                  availableSlots={['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']} // Mock slots for now
                  onTimeSelect={handleTimeSelect}
                  selectedTime={selectedTime}
                />
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && selectedDate && selectedTime && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-6">{t('summary.booking_details')}</h2>
                
                {/* Booking Summary */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{skill.title}</p>
                      <p className="text-sm text-slate-600">with {skill.profiles?.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">
                        {new Date(selectedDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-slate-600">{t('summary.session_date')}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-100 to-teal-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">
                        {new Date(`2000-01-01T${selectedTime}`).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </p>
                      <p className="text-sm text-slate-600">{skill.duration} session</p>
                    </div>
                  </div>
                </div>

                {/* Optional Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific requirements or questions..."
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-soft-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>

                {/* Confirm Button */}
                <Button
                  onClick={handleConfirmBooking}
                  disabled={createBooking.isPending}
                  className="w-full h-12 bg-gradient-to-r from-soft-blue-600 to-mint-600 hover:from-soft-blue-700 hover:to-mint-700 text-white font-semibold rounded-xl shadow-lg border-0"
                >
                  {createBooking.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {t('summary.confirming')}
                    </div>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      {t('summary.confirm_booking')}
                    </>
                  )}
                </Button>

                <p className="text-xs text-slate-500 text-center mt-3">
                  {t('summary.booking_notice')}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreeBookingCreate;
