
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
  const { t } = useTranslation('bookings');

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
            {t('booking_details')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(booking.status)}>
              {String(t(`status.${booking.status}`, booking.status)).toUpperCase()}
            </Badge>
            <span className="text-sm text-gray-500">
              {t('booking_number')} #{booking.id?.slice(0, 8)}
            </span>
          </div>

          {/* Service Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">{t('service')}</h3>
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
                <p className="text-sm text-gray-500">{t('date')}</p>
                <p className="font-medium">{booking.booking_date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">{t('time')}</p>
                <p className="font-medium">{booking.booking_time}</p>
              </div>
            </div>
          </div>

          {/* People */}
          <div className="space-y-3">
            <h3 className="font-semibold">{t('people')}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={booking.client?.avatar} />
                  <AvatarFallback>{booking.client?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{booking.client?.name}</p>
                  <p className="text-sm text-gray-500">{t('client')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={booking.provider?.avatar} />
                  <AvatarFallback>{booking.provider?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="font-medium">{booking.provider?.name}</p>
                  <p className="text-sm text-gray-500">{t('provider')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">{t('location')}</p>
                <p className="font-medium">{booking.location || t('remote')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">{t('price')}</p>
                <p className="font-medium">${booking.price}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div>
              <h3 className="font-semibold mb-2">{t('notes')}</h3>
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
                {t('confirm_booking')}
              </Button>
              <Button 
                variant="outline"
                onClick={() => onStatusUpdate(booking.id, 'cancelled')}
                className="flex-1"
              >
                {t('cancel_booking')}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailModal;
