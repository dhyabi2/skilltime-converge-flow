
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';

interface BookingDatePickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const BookingDatePicker = ({ selectedDate, onDateSelect }: BookingDatePickerProps) => {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2); // Allow booking up to 2 months ahead

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CalendarIcon className="h-5 w-5" />
          Select Date
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          disabled={(date) => date < today || date > maxDate}
          className="rounded-md border-0"
          classNames={{
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_disabled: "text-gray-300",
            day_outside: "text-gray-400",
          }}
        />
      </CardContent>
    </Card>
  );
};

export default BookingDatePicker;
