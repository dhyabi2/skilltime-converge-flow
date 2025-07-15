
import React, { useEffect, useState } from 'react';
import { freeBookingsService } from '@/services/supabase/freeBookings';
import BookingTimeSlots from './BookingTimeSlots';

interface FreeBookingTimeSlotsProps {
  skillId: string;
  selectedDate: string;
  onTimeSelect: (time: string) => void;
  selectedTime?: string;
}

const FreeBookingTimeSlots = ({ 
  skillId, 
  selectedDate, 
  onTimeSelect, 
  selectedTime 
}: FreeBookingTimeSlotsProps) => {
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!skillId || !selectedDate) return;
      
      setLoading(true);
      try {
        const slots = await freeBookingsService.getAvailableSlots(skillId, selectedDate);
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Failed to fetch available slots:', error);
        setAvailableSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [skillId, selectedDate]);

  return (
    <BookingTimeSlots
      availableSlots={availableSlots}
      onTimeSelect={onTimeSelect}
      selectedTime={selectedTime}
      loading={loading}
    />
  );
};

export default FreeBookingTimeSlots;
