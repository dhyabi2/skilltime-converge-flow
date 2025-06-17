
import React, { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
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
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t('actions.reschedule')} Booking
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Booking Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">Current Booking</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <p className="font-medium">{booking?.skillTitle}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(booking?.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{booking?.time}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Select New Date</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < today || date > maxDate}
                className="rounded-md border-0"
                classNames={{
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  day_disabled: "text-gray-300",
                }}
              />
            </CardContent>
          </Card>

          {/* Time Selection */}
          {selectedDate && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">
                  Select Time - {formatDate(selectedDate)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className="h-10"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReschedule}
              disabled={!selectedDate || !selectedTime || isLoading}
              className="flex-1"
            >
              {isLoading ? 'Rescheduling...' : 'Confirm Reschedule'}
            </Button>
          </div>

          {/* Notice */}
          <div className="text-xs text-gray-500 text-center">
            You can reschedule up to 24 hours before your appointment
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleModal;
