
import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BookingTimeSlotsProps {
  availableSlots: string[];
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  selectedDate: Date;
}

const BookingTimeSlots = ({ 
  availableSlots, 
  selectedTime, 
  onTimeSelect, 
  selectedDate 
}: BookingTimeSlotsProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Clock className="h-5 w-5" />
          Available Times - {formatDate(selectedDate)}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-3 gap-3">
          {availableSlots.map((time) => (
            <Button
              key={time}
              variant={selectedTime === time ? "default" : "outline"}
              className={`h-12 ${
                selectedTime === time 
                  ? 'bg-primary text-primary-foreground' 
                  : 'border-gray-200 hover:border-primary hover:bg-primary/5'
              }`}
              onClick={() => onTimeSelect(time)}
            >
              {time}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingTimeSlots;
