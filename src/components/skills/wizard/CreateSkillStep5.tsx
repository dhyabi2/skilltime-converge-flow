
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Clock, Plus, X, Eye, Calendar } from 'lucide-react';

interface TimeSlot {
  day_of_week: number;
  start_time: string;
  end_time: string;
}

interface CreateSkillStep5Props {
  data: any;
  onChange: (data: any) => void;
  onPreview: () => void;
  onBack: () => void;
}

const DAYS = [
  { value: 0, label: 'Sunday', emoji: '☀️' },
  { value: 1, label: 'Monday', emoji: '💼' },
  { value: 2, label: 'Tuesday', emoji: '🔥' },
  { value: 3, label: 'Wednesday', emoji: '⚡' },
  { value: 4, label: 'Thursday', emoji: '🚀' },
  { value: 5, label: 'Friday', emoji: '🎉' },
  { value: 6, label: 'Saturday', emoji: '🌟' }
];

const TIME_OPTIONS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

const CreateSkillStep5: React.FC<CreateSkillStep5Props> = ({
  data,
  onChange,
  onPreview,
  onBack
}) => {
  const availability = data.availability || [];

  const addTimeSlot = () => {
    onChange({ 
      availability: [...availability, { day_of_week: 1, start_time: '09:00', end_time: '10:00' }] 
    });
  };

  const removeTimeSlot = (index: number) => {
    onChange({ 
      availability: availability.filter((_: any, i: number) => i !== index) 
    });
  };

  const updateTimeSlot = (index: number, field: keyof TimeSlot, value: string | number) => {
    const updated = [...availability];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ availability: updated });
  };

  const quickAddOptions = [
    { label: 'Weekday Mornings', days: [1, 2, 3, 4, 5], time: '09:00-12:00' },
    { label: 'Weekend Sessions', days: [0, 6], time: '10:00-16:00' },
    { label: 'Evening Classes', days: [1, 2, 3, 4, 5], time: '18:00-20:00' },
  ];

  const addQuickAvailability = (option: typeof quickAddOptions[0]) => {
    const newSlots = option.days.map(day => ({
      day_of_week: day,
      start_time: option.time.split('-')[0],
      end_time: option.time.split('-')[1]
    }));
    onChange({ availability: [...availability, ...newSlots] });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-xl">
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-800">
                When Are You Free? 📅
              </h3>
              <p className="text-sm text-indigo-600">Set your availability or skip to add it later</p>
            </div>
          </div>
          
          <div className="text-center text-indigo-700">
            <p className="text-sm">💡 Pro tip: More availability = more bookings!</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Add Options */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-mint-500" />
            Quick Add Popular Times ⚡
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {quickAddOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => addQuickAvailability(option)}
                className="p-4 text-left bg-gradient-to-r from-mint-50 to-soft-blue-50 hover:from-mint-100 hover:to-soft-blue-100 rounded-xl border border-mint-200 transition-all duration-200 hover:scale-105 hover:shadow-md"
              >
                <div className="font-medium text-slate-800 mb-1">{option.label}</div>
                <div className="text-sm text-slate-600">{option.time}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Time Slots */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" />
              Custom Availability ⚙️
            </h4>
            <Button
              type="button"
              onClick={addTimeSlot}
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl px-4 py-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Slot
            </Button>
          </div>

          {availability.length > 0 ? (
            <div className="space-y-4">
              {availability.map((slot: TimeSlot, index: number) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{DAYS.find(d => d.value === slot.day_of_week)?.emoji}</span>
                  </div>
                  
                  <Select
                    value={slot.day_of_week.toString()}
                    onValueChange={(value) => updateTimeSlot(index, 'day_of_week', parseInt(value))}
                  >
                    <SelectTrigger className="w-36 bg-white/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DAYS.map(day => (
                        <SelectItem key={day.value} value={day.value.toString()}>
                          {day.emoji} {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={slot.start_time}
                    onValueChange={(value) => updateTimeSlot(index, 'start_time', value)}
                  >
                    <SelectTrigger className="w-24 bg-white/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_OPTIONS.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <span className="text-slate-500 font-medium">to</span>
                  
                  <Select
                    value={slot.end_time}
                    onValueChange={(value) => updateTimeSlot(index, 'end_time', value)}
                  >
                    <SelectTrigger className="w-24 bg-white/80">
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
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <Clock className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>No custom slots added yet</p>
              <p className="text-sm">Add time slots or use quick options above</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skip Option */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
        <CardContent className="p-4 text-center">
          <p className="text-yellow-800 text-sm">
            ⏰ <strong>Skip for now?</strong> You can always add your availability later in your skill settings.
          </p>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="h-12 px-6 rounded-xl border-slate-300 hover:bg-slate-50"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        
        <Button
          onClick={onPreview}
          className="h-12 px-8 rounded-xl font-semibold bg-gradient-to-r from-mint-500 to-soft-blue-500 hover:from-mint-600 hover:to-soft-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <Eye className="w-5 h-5 mr-2" />
          <span>Preview & Publish! 🚀</span>
        </Button>
      </div>
    </div>
  );
};

export default CreateSkillStep5;
