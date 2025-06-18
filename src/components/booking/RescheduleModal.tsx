
import React, { useState } from 'react';
import { Calendar, Clock, X, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { bookingsAPI } from '../../services';

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
  onRescheduleSuccess: () => void;
}

const RescheduleModal = ({ isOpen, onClose, booking, onRescheduleSuccess }: RescheduleModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('bookings');

  // Generate available time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];

  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime) return;

    try {
      setIsLoading(true);
      const newDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      newDateTime.setHours(parseInt(hours), parseInt(minutes));

      await bookingsAPI.reschedule(booking.id, newDateTime.toISOString());
      
      onRescheduleSuccess();
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error rescheduling booking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedDate(null);
    setSelectedTime('');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto max-h-[95vh] overflow-y-auto bg-gradient-to-br from-soft-blue-50 to-mint-50 border-0 shadow-2xl rounded-3xl p-0">
        <div className="relative p-6 pb-4">
          {/* Header with gradient background */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-soft-blue-500 to-mint-500 rounded-t-3xl opacity-10"></div>
          
          <DialogHeader className="relative z-10">
            <DialogTitle className="flex items-center gap-3 text-xl font-bold text-slate-800 mb-2">
              <div className="p-2 bg-soft-blue-100 rounded-xl">
                <Calendar className="h-6 w-6 text-soft-blue-600" />
              </div>
              Reschedule Booking
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Current Booking Info with elegant card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-soft-blue-400 to-mint-400 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Current Booking</p>
                  <p className="text-slate-600 text-xs">Tap to reschedule</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="font-bold text-slate-800">{booking?.skillTitle}</p>
                <div className="flex items-center text-sm text-slate-600 gap-2">
                  <Calendar className="w-4 h-4 text-soft-blue-500" />
                  <span>{new Date(booking?.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600 gap-2">
                  <Clock className="w-4 h-4 text-mint-500" />
                  <span>{booking?.time}</span>
                </div>
              </div>
            </div>

            {/* Date Selection with improved mobile UX */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-soft-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-soft-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Select New Date</h3>
              </div>
              
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < today || date > maxDate}
                className="rounded-xl border-0 bg-transparent"
                classNames={{
                  day_selected: "bg-gradient-to-br from-soft-blue-500 to-mint-500 text-white hover:from-soft-blue-600 hover:to-mint-600 rounded-xl font-semibold",
                  day_disabled: "text-slate-300",
                  day: "hover:bg-soft-blue-50 rounded-lg transition-colors",
                  head_cell: "text-slate-600 font-semibold",
                  cell: "text-center p-1",
                }}
              />
            </div>

            {/* Time Selection with elegant grid */}
            {selectedDate && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-mint-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-mint-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Select Time</h3>
                    <p className="text-xs text-slate-600">{formatDate(selectedDate)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className={`h-12 rounded-xl font-medium transition-all duration-200 ${
                        selectedTime === time
                          ? 'bg-gradient-to-r from-soft-blue-500 to-mint-500 text-white shadow-lg scale-105 border-0'
                          : 'bg-white/50 hover:bg-white/80 border-slate-200 text-slate-700 hover:scale-105'
                      }`}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons with improved styling */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12 rounded-xl bg-white/50 hover:bg-white/80 border-slate-200 text-slate-700 font-medium"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleReschedule}
                disabled={!selectedDate || !selectedTime || isLoading}
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-soft-blue-500 to-mint-500 hover:from-soft-blue-600 hover:to-mint-600 text-white font-semibold border-0 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Rescheduling...
                  </div>
                ) : (
                  'Confirm Reschedule'
                )}
              </Button>
            </div>

            {/* Notice with elegant styling */}
            <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-3 text-center">
              <p className="text-xs text-amber-700 font-medium">
                ⏰ You can reschedule up to 24 hours before your appointment
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleModal;
