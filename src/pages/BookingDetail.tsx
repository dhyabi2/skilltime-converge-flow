
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, MapPin, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { bookingsService } from '@/services/supabase/bookings';
import { useQuery } from '@tanstack/react-query';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

const BookingDetail = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log('BookingDetail loaded with bookingId:', bookingId);

  const { data: booking, isLoading, error } = useQuery({
    queryKey: ['booking-detail', bookingId],
    queryFn: () => bookingsService.getById(bookingId!),
    enabled: !!bookingId,
  });

  useEffect(() => {
    console.log('Booking data loaded:', { booking, isLoading, error });
  }, [booking, isLoading, error]);

  // Handle authentication requirement
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Authentication Required</h1>
          <p className="text-slate-600 mb-4">Please sign in to view booking details</p>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <LoadingSkeleton className="h-20 mb-6" />
          <LoadingSkeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (error || !booking) {
    console.error('Booking loading error:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Booking Not Found</h1>
          <p className="text-slate-600 mb-4">
            The booking you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <p className="text-sm text-slate-500 mb-4">Booking ID: {bookingId}</p>
          <Button onClick={() => navigate('/bookings')}>View My Bookings</Button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(booking.booking_date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedTime = new Date(`2000-01-01T${booking.booking_time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/bookings')}
            className="p-2 hover:bg-white/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Booking Details</h1>
            <p className="text-sm text-slate-600">View your booking information</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(booking.status)}`}>
            {booking.status}
          </span>
        </div>

        {/* Booking Details */}
        <div className="space-y-6">
          {/* Service Information */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              <h2 className="font-bold text-lg text-slate-800 mb-4">Service Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{booking.skills?.title}</p>
                    <p className="text-sm text-slate-600">
                      with {booking.provider?.name || 'Provider'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{formattedDate}</p>
                    <p className="text-sm text-slate-600">Session date</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-100 to-teal-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{formattedTime}</p>
                    <p className="text-sm text-slate-600">{booking.duration} session</p>
                  </div>
                </div>

                {booking.location && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-100 to-green-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{booking.location}</p>
                      <p className="text-sm text-slate-600">Meeting location</p>
                    </div>
                  </div>
                )}

                {booking.notes && (
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-yellow-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Notes</p>
                      <p className="text-sm text-slate-600">{booking.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg text-slate-800 mb-3">Contact Information</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Provider</p>
                  <p className="font-medium text-slate-800">{booking.provider?.name}</p>
                  {booking.provider?.phone && (
                    <p className="text-sm text-slate-600">{booking.provider.phone}</p>
                  )}
                </div>
                
                <div>
                  <p className="text-sm text-slate-600">Client</p>
                  <p className="font-medium text-slate-800">{booking.client?.name}</p>
                  {booking.client?.phone && (
                    <p className="text-sm text-slate-600">{booking.client.phone}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={() => navigate('/bookings')}
              className="w-full h-12 bg-gradient-to-r from-soft-blue-600 to-mint-600 hover:from-soft-blue-700 hover:to-mint-700 text-white font-semibold rounded-xl shadow-lg border-0"
            >
              Back to My Bookings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
