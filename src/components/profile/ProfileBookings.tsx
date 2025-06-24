
import React from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProfileBookingsProps {
  userId: string;
}

const ProfileBookings: React.FC<ProfileBookingsProps> = ({ userId }) => {
  // Mock data - replace with actual data fetching
  const mockBookings = {
    upcoming: [
      {
        id: '1',
        skillTitle: 'Web Development Consultation',
        providerName: 'John Doe',
        date: '2024-06-26',
        time: '14:00',
        location: 'Remote',
        status: 'confirmed',
        price: 25
      }
    ],
    past: [
      {
        id: '2',
        skillTitle: 'Guitar Lesson',
        providerName: 'Sarah Smith',
        date: '2024-06-20',
        time: '16:00',
        location: 'Muscat',
        status: 'completed',
        price: 15
      }
    ],
    provided: [
      {
        id: '3',
        skillTitle: 'Photography Session',
        clientName: 'Mike Johnson',
        date: '2024-06-22',
        time: '10:00',
        location: 'Salalah',
        status: 'completed',
        price: 50
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const BookingCard = ({ booking, type }: { booking: any, type: 'received' | 'provided' }) => (
    <Card className="mb-3 sm:mb-4">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 sm:mb-3">
          <div className="flex-1 mb-2 sm:mb-0">
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{booking.skillTitle}</h3>
            <div className="flex items-center gap-1 text-xs sm:text-sm text-slate-600 mt-1">
              <User className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{type === 'provided' ? booking.clientName : booking.providerName}</span>
            </div>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <Badge className={`${getStatusColor(booking.status)} text-xs mb-1 sm:mb-0`}>
              {booking.status}
            </Badge>
            <p className="text-xs sm:text-sm font-medium text-slate-800 mt-1">{booking.price} OMR</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{booking.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1 sm:mb-2">My Bookings</h2>
        <p className="text-slate-600 text-sm">Manage your booking history and upcoming sessions</p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full h-auto p-1">
          <div className="flex w-full">
            <TabsTrigger value="upcoming" className="flex-1 text-xs sm:text-sm px-2 py-2">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past" className="flex-1 text-xs sm:text-sm px-2 py-2">
              Past
            </TabsTrigger>
            <TabsTrigger value="provided" className="flex-1 text-xs sm:text-sm px-2 py-2">
              Provided
            </TabsTrigger>
          </div>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-4 sm:mt-6">
          {mockBookings.upcoming.length === 0 ? (
            <Card>
              <CardContent className="text-center py-6 sm:py-8">
                <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">No upcoming bookings</h3>
                <p className="text-slate-600 text-sm">Your upcoming sessions will appear here</p>
              </CardContent>
            </Card>
          ) : (
            <div>
              {mockBookings.upcoming.map((booking) => (
                <BookingCard key={booking.id} booking={booking} type="received" />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="mt-4 sm:mt-6">
          {mockBookings.past.length === 0 ? (
            <Card>
              <CardContent className="text-center py-6 sm:py-8">
                <Clock className="w-8 h-8 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">No past bookings</h3>
                <p className="text-slate-600 text-sm">Your booking history will appear here</p>
              </CardContent>
            </Card>
          ) : (
            <div>
              {mockBookings.past.map((booking) => (
                <BookingCard key={booking.id} booking={booking} type="received" />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="provided" className="mt-4 sm:mt-6">
          {mockBookings.provided.length === 0 ? (
            <Card>
              <CardContent className="text-center py-6 sm:py-8">
                <User className="w-8 h-8 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">No services provided</h3>
                <p className="text-slate-600 text-sm">Services you've provided will appear here</p>
              </CardContent>
            </Card>
          ) : (
            <div>
              {mockBookings.provided.map((booking) => (
                <BookingCard key={booking.id} booking={booking} type="provided" />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileBookings;
