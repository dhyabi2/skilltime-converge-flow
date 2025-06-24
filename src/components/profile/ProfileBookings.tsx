
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Plus, Eye } from 'lucide-react';
import { useUserBookings } from '@/hooks/useRealBookings';
import BookingDetailModal from './modals/BookingDetailModal';

const ProfileBookings = () => {
  const { data: bookings = [], isLoading } = useUserBookings();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            My Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const recentBookings = bookings.slice(0, 3);

  return (
    <>
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              My Bookings
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              <Plus className="w-4 h-4 mr-1" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentBookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No bookings yet</p>
              <p className="text-sm">Your upcoming sessions will appear here</p>
            </div>
          ) : (
            recentBookings.map((booking) => (
              <div
                key={booking.id}
                onClick={() => setSelectedBooking(booking)}
                className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">📚</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                        {booking.skills?.title || 'Skill Session'}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-3 h-3" />
                        <span>with {booking.profiles?.name || 'Student'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                      {booking.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(booking.booking_date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(booking.booking_time)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{booking.location || 'Remote'}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <BookingDetailModal
        booking={selectedBooking}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </>
  );
};

export default ProfileBookings;
