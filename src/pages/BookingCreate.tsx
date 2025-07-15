
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, User, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSkillDetails, useSkillAvailableSlots } from '@/hooks/useSkillDetails';
import { useCreateBooking } from '@/hooks/useRealBookings';
import { useAuth } from '@/contexts/AuthContext';
import BookingDatePicker from '@/components/booking/BookingDatePicker';
import BookingTimeSlots from '@/components/booking/BookingTimeSlots';
import BookingSummary from '@/components/booking/BookingSummary';

const BookingCreate = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { t } = useTranslation('bookings');
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState(1);
  
  const { data: skill, isLoading: skillLoading } = useSkillDetails(skillId);
  const { data: availableSlots = [], isLoading: slotsLoading } = useSkillAvailableSlots(
    skillId, 
    selectedDate
  );
  const createBooking = useCreateBooking();

  // Parse pre-selected slot from URL
  useEffect(() => {
    const slot = searchParams.get('slot');
    if (slot) {
      const [date, time] = slot.split('-');
      setSelectedDate(date);
      setSelectedTime(time);
      setStep(3); // Skip to summary
    }
  }, [searchParams]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleBookingConfirm = async () => {
    if (!skill || !user || !selectedDate || !selectedTime) return;

    try {
      await createBooking.mutateAsync({
        skill_id: skill.id,
        client_id: user.id,
        provider_id: skill.provider_id,
        booking_date: selectedDate,
        booking_time: selectedTime,
        price: skill.price,
        duration: skill.duration,
        location: skill.location || 'Remote',
        status: 'pending'
      });

      navigate('/booking-confirmation', {
        state: {
          skill: skill.title,
          provider: skill.profiles?.name,
          date: selectedDate,
          time: selectedTime,
          price: skill.price
        }
      });
    } catch (error) {
      console.error('Booking creation failed:', error);
    }
  };

  if (skillLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-soft-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">{t('loading.skill')}</p>
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
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{t('title')}</h1>
            <p className="text-sm text-slate-600">{skill.title}</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum 
                    ? 'bg-soft-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNum ? 'bg-soft-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-soft-blue-600" />
                {t('steps.select_date')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BookingDatePicker
                skillId={skillId!}
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
              />
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-mint-600" />
                {t('steps.select_time')}
              </CardTitle>
              <p className="text-sm text-slate-600">
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </CardHeader>
            <CardContent>
              <BookingTimeSlots
                availableSlots={availableSlots}
                onTimeSelect={handleTimeSelect}
                selectedTime={selectedTime}
                loading={slotsLoading}
              />
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                {t('steps.confirm_booking')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BookingSummary
                skill={skill}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onConfirm={handleBookingConfirm}
                loading={createBooking.isPending}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingCreate;
