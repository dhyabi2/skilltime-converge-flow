
import React from 'react';
import { Calendar, Clock, MapPin, User, Phone, MessageSquare, Navigation } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MobileBookingCardProps {
  booking: any;
  onViewDetails: (booking: any) => void;
  onCall?: (booking: any) => void;
  onMessage?: (booking: any) => void;
  onDirections?: (booking: any) => void;
}

const MobileBookingCard: React.FC<MobileBookingCardProps> = ({ 
  booking, 
  onViewDetails,
  onCall,
  onMessage,
  onDirections
}) => {
  const { t } = useTranslation('profile');

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

  const isUpcoming = new Date(booking.booking_date) > new Date();
  const otherUser = booking.client?.name || booking.provider?.name || t('bookings.student');
  const otherUserAvatar = booking.client?.avatar || booking.provider?.avatar;

  return (
    <Card className="border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 mb-3">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={otherUserAvatar} alt={otherUser} />
              <AvatarFallback className="bg-blue-100 text-blue-800 text-sm">
                {otherUser.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-gray-800 truncate">
                {booking.skills?.title || t('bookings.skill_session')}
              </h4>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <User className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{t('bookings.with')} {otherUser}</span>
              </div>
            </div>
          </div>
          <Badge className={`${getStatusColor(booking.status)} text-xs flex-shrink-0`}>
            {t(`bookings.status.${booking.status}`, booking.status)}
          </Badge>
        </div>
        
        {/* Booking Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>{formatDate(booking.booking_date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>{formatTime(booking.booking_time)} • {booking.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <span className="truncate">{booking.location || t('bookings.remote')}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(booking)}
            className="flex-1"
          >
            View Details
          </Button>
          
          {isUpcoming && booking.status === 'confirmed' && (
            <>
              {booking.client?.phone && onCall && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onCall(booking)}
                  className="flex-shrink-0 h-8 w-8"
                >
                  <Phone className="w-4 h-4" />
                </Button>
              )}
              
              {onMessage && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onMessage(booking)}
                  className="flex-shrink-0 h-8 w-8"
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
              )}
              
              {booking.location && booking.location !== 'Remote' && onDirections && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onDirections(booking)}
                  className="flex-shrink-0 h-8 w-8"
                >
                  <Navigation className="w-4 h-4" />
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileBookingCard;
