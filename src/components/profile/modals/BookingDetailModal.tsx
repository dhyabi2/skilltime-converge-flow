
import React from 'react';
import { X, Calendar, Clock, MapPin, User, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface BookingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
  onStatusUpdate?: (bookingId: string, status: string) => void;
}

const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  isOpen,
  onClose,
  booking,
  onStatusUpdate
}) => {
  const { t } = useTranslation('profile');

  if (!booking) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Booking Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(booking.status)}>
              {booking.status?.toUpperCase()}
            </Badge>
            <span className="text-sm text-gray-500">
              Booking #{booking.id?.slice(0, 8)}
            </span>
          </div>

          {/* Service Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Service</h3>
            <div className="flex items-center gap-3">
              <img 
                src={booking.skills?.image_url || '/placeholder.svg'} 
                alt={booking.skills?.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium">{booking.skills?.title}</p>
                <p className="text-sm text-gray-600">{booking.duration}</p>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{booking.booking_date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{booking.booking_time}</p>
              </div>
            </div>
          </div>

          {/* People */}
          <div className="space-y-3">
            <h3 className="font-semibold">People</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={booking.profiles?.avatar} />
                  <AvatarFallback>{booking.profiles?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{booking.profiles?.name}</p>
                  <p className="text-sm text-gray-500">Client</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={booking.provider?.avatar} />
                  <AvatarFallback>{booking.provider?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="font-medium">{booking.provider?.name}</p>
                  <p className="text-sm text-gray-500">Provider</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{booking.location || 'Remote'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium">${booking.price}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div>
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{booking.notes}</p>
            </div>
          )}

          {/* Actions */}
          {onStatusUpdate && booking.status === 'pending' && (
            <div className="flex gap-2 pt-4 border-t">
              <Button 
                onClick={() => onStatusUpdate(booking.id, 'confirmed')}
                className="flex-1"
              >
                Confirm Booking
              </Button>
              <Button 
                variant="outline"
                onClick={() => onStatusUpdate(booking.id, 'cancelled')}
                className="flex-1"
              >
                Cancel Booking
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailModal;
