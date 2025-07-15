
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useSkillAvailableSlots } from '@/hooks/useSkillDetails';

interface BookingDatePickerProps {
  skillId: string;
  onDateSelect: (date: string) => void;
  selectedDate?: string;
}

const BookingDatePicker = ({ skillId, onDateSelect, selectedDate }: BookingDatePickerProps) => {
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | undefined>(
    selectedDate ? new Date(selectedDate) : undefined
  );

  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2); // Allow booking up to 2 months ahead

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedCalendarDate(date);
      onDateSelect(date.toISOString().split('T')[0]);
    }
  };

  return (
    <div className="flex justify-center">
      <Calendar
        mode="single"
        selected={selectedCalendarDate}
        onSelect={handleDateSelect}
        disabled={(date) => date < today || date > maxDate}
        className="rounded-xl border-0 bg-transparent"
        classNames={{
          day_selected: "bg-gradient-to-br from-soft-blue-500 to-mint-500 text-white hover:from-soft-blue-600 hover:to-mint-600 rounded-xl font-semibold",
          day_disabled: "text-slate-300 cursor-not-allowed",
          day: "hover:bg-soft-blue-50 rounded-lg transition-colors cursor-pointer",
          head_cell: "text-slate-600 font-semibold",
          cell: "text-center p-1",
        }}
      />
    </div>
  );
};

export default BookingDatePicker;
