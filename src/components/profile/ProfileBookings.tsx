
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUserBookings } from '@/hooks/useRealBookings';
import BookingDetailModal from './modals/BookingDetailModal';

interface ProfileBookingsProps {
  userId: string;
}

const ProfileBookings: React.FC<ProfileBookingsProps> = ({ userId }) => {
  const { t } = useTranslation('bookings');
  const { data: bookings = [], isLoading } = useUserBookings();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBookingClick = (booking: any) => {
    setSelectedBooking(booking);
  };

  const handleStatusUpdate = (bookingId: string, status: string) => {
    console.log('Update booking status:', bookingId, status);
    // This will be handled by the modal
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            My Bookings
          </h2>
          <p className="text-slate-600 text-sm">Loading your bookings...</p>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="animate-pulse space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-200 rounded-lg w-16 h-16"></div>
                    <div className="flex-1 space-y-2">
                      <div className="bg-gray-200 rounded h-4 w-3/4"></div>
                      <div className="bg-gray-200 rounded h-3 w-1/2"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          My Bookings
        </h2>
        <p className="text-slate-600 text-sm">Manage your upcoming and past bookings</p>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card 
            key={booking.id} 
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            onClick={() => handleBookingClick(booking)}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Service Image */}
                <div className="flex-shrink-0">
                  <img 
                    src={booking.skills?.image_url || '/placeholder.svg'} 
                    alt={booking.skills?.title || 'Service'}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
                  />
                </div>

                {/* Booking Details */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-semibold text-lg text-slate-800">
                      {booking.skills?.title || 'Unknown Service'}
                    </h3>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{booking.booking_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{booking.booking_time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span>{booking.price} OMR</span>
                    </div>
                  </div>

                  {/* People */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={booking.profiles?.avatar} />
                        <AvatarFallback>{booking.profiles?.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{booking.profiles?.name || 'Unknown Client'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{booking.provider?.name || 'Unknown Provider'}</span>
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={booking.provider?.avatar} />
                        <AvatarFallback>{booking.provider?.name?.charAt(0) || 'P'}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  {booking.notes && (
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg line-clamp-2">
                      {booking.notes}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {bookings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No bookings yet</h3>
          <p className="text-gray-500">Your bookings will appear here once you start using the platform.</p>
        </div>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <BookingDetailModal
          isOpen={true}
          onClose={() => setSelectedBooking(null)}
          booking={selectedBooking}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default ProfileBookings;
