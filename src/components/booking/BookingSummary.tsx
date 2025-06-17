
import React from 'react';
import { Calendar, Clock, User, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Service {
  id: string;
  title: string;
  provider: string;
  image: string;
  price: number;
}

interface BookingSummaryProps {
  service: Service;
  date: Date;
  time: string;
  duration: number;
  total: number;
}

const BookingSummary = ({ service, date, time, duration, total }: BookingSummaryProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };

  return (
    <div className="space-y-4">
      {/* Service Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Service Details</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-4">
            <img
              src={service.image}
              alt={service.provider}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{service.title}</h3>
              <div className="flex items-center gap-1 text-gray-600 mt-1">
                <User className="h-4 w-4" />
                <span className="text-sm">{service.provider}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Session Details</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-500" />
            <div>
              <div className="font-medium">{formatDate(date)}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-gray-500" />
            <div>
              <div className="font-medium">{formatTime(time)}</div>
              <div className="text-sm text-gray-600">{duration} minutes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex justify-between">
            <span>Session ({duration}min)</span>
            <span>${service.price}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Duration multiplier</span>
            <span>×{duration / 60}</span>
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total</span>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span className="text-xl font-bold">{total}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingSummary;
