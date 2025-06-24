
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from 'lucide-react';

interface TimeSlot {
  day_of_week: number;
  start_time: string;
  end_time: string;
}

interface SkillAvailabilitySelectorProps {
  availability: TimeSlot[];
  onChange: (availability: TimeSlot[]) => void;
}

const DAYS = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' }
];

const TIME_OPTIONS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

const SkillAvailabilitySelector: React.FC<SkillAvailabilitySelectorProps> = ({
  availability,
  onChange
}) => {
  const addTimeSlot = () => {
    onChange([...availability, { day_of_week: 1, start_time: '09:00', end_time: '10:00' }]);
  };

  const removeTimeSlot = (index: number) => {
    onChange(availability.filter((_, i) => i !== index));
  };

  const updateTimeSlot = (index: number, field: keyof TimeSlot, value: string | number) => {
    const updated = [...availability];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Availability</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {availability.map((slot, index) => (
          <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Select
              value={slot.day_of_week.toString()}
              onValueChange={(value) => updateTimeSlot(index, 'day_of_week', parseInt(value))}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map(day => (
                  <SelectItem key={day.value} value={day.value.toString()}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={slot.start_time}
              onValueChange={(value) => updateTimeSlot(index, 'start_time', value)}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIME_OPTIONS.map(time => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <span className="text-sm text-gray-500">to</span>
            
            <Select
              value={slot.end_time}
              onValueChange={(value) => updateTimeSlot(index, 'end_time', value)}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIME_OPTIONS.map(time => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeTimeSlot(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        
        <Button type="button" variant="outline" onClick={addTimeSlot}>
          Add Time Slot
        </Button>
      </CardContent>
    </Card>
  );
};

export default SkillAvailabilitySelector;
