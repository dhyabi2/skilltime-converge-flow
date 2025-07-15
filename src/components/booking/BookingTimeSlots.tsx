
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

interface BookingTimeSlotsProps {
  availableSlots: string[];
  onTimeSelect: (time: string) => void;
  selectedTime?: string;
  loading?: boolean;
}

const BookingTimeSlots = ({ 
  availableSlots, 
  onTimeSelect, 
  selectedTime,
  loading 
}: BookingTimeSlotsProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-200 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (availableSlots.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-600 font-medium">No available time slots</p>
        <p className="text-sm text-gray-500">Please select a different date</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {availableSlots.map((timeSlot) => {
          const formattedTime = new Date(`2000-01-01T${timeSlot}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });

          return (
            <Button
              key={timeSlot}
              variant={selectedTime === timeSlot ? "default" : "outline"}
              onClick={() => onTimeSelect(timeSlot)}
              className={`h-12 rounded-xl font-medium transition-all duration-200 ${
                selectedTime === timeSlot
                  ? 'bg-gradient-to-r from-soft-blue-500 to-mint-500 text-white shadow-lg scale-105 border-0'
                  : 'bg-white/50 hover:bg-white/80 border-slate-200 text-slate-700 hover:scale-105'
              }`}
            >
              {formattedTime}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BookingTimeSlots;
