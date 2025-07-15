
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, User, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BookingSummaryProps {
  skill: any;
  selectedDate: string;
  selectedTime: string;
  onConfirm: () => void;
  loading?: boolean;
}

const BookingSummary = ({ 
  skill, 
  selectedDate, 
  selectedTime, 
  onConfirm, 
  loading 
}: BookingSummaryProps) => {
  const { t } = useTranslation('bookings');

  const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedTime = new Date(`2000-01-01T${selectedTime}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="space-y-6">
      {/* Service Details */}
      <Card className="bg-gradient-to-r from-soft-blue-50 to-mint-50 border border-soft-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <img
              src={skill.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'}
              alt={skill.title}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 mb-1">{skill.title}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                <User className="w-4 h-4" />
                <span>{skill.profiles?.name}</span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2">{skill.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <div className="space-y-3">
        <h4 className="font-semibold text-slate-800">{t('summary.booking_details')}</h4>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
            <Calendar className="w-5 h-5 text-soft-blue-600" />
            <div>
              <p className="font-medium text-slate-800">{formattedDate}</p>
              <p className="text-sm text-slate-600">{t('summary.session_date')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
            <Clock className="w-5 h-5 text-mint-600" />
            <div>
              <p className="font-medium text-slate-800">{formattedTime}</p>
              <p className="text-sm text-slate-600">{t('summary.session_time')} • {skill.duration}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
            <MapPin className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-slate-800">{skill.location || 'Remote'}</p>
              <p className="text-sm text-slate-600">{t('summary.session_location')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-mint-50 rounded-lg border border-green-200">
            <DollarSign className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-bold text-green-800 text-lg">{skill.price} OMR</p>
              <p className="text-sm text-green-600">{t('summary.total_price')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation */}
      <div className="pt-4 border-t border-slate-200">
        <Button
          onClick={onConfirm}
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-soft-blue-600 to-mint-600 hover:from-soft-blue-700 hover:to-mint-700 text-white font-semibold rounded-xl shadow-lg border-0"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              {t('summary.confirming')}
            </div>
          ) : (
            t('summary.confirm_booking')
          )}
        </Button>
        
        <p className="text-xs text-slate-500 text-center mt-2">
          {t('summary.booking_notice')}
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;
