
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { bookingsAPI } from '../services';
import RescheduleModal from '../components/booking/RescheduleModal';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [rescheduleModal, setRescheduleModal] = useState({ isOpen: false, booking: null });
  const { t } = useTranslation('bookings');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // Mock user ID - in real app, get from auth context
      const userBookings = await bookingsAPI.getAll('1');
      console.log('Fetched bookings:', userBookings);
      setBookings(userBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await bookingsAPI.cancel(bookingId, 'User requested cancellation');
      // Refresh bookings
      fetchBookings();
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const handleRescheduleClick = (booking: any) => {
    setRescheduleModal({ isOpen: true, booking });
  };

  const handleRescheduleSuccess = () => {
    fetchBookings(); // Refresh bookings after successful reschedule
  };

  const closeRescheduleModal = () => {
    setRescheduleModal({ isOpen: false, booking: null });
  };

  const getFilteredBookings = () => {
    const today = new Date();
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      if (activeTab === 'upcoming') {
        return bookingDate >= today || booking.status === 'confirmed' || booking.status === 'pending';
      } else {
        return bookingDate < today || booking.status === 'completed';
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-mint-50 to-soft-blue-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-soft-blue-200 border-t-soft-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">{t('status.loading')}</p>
        </div>
      </div>
    );
  }

  const filteredBookings = getFilteredBookings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-mint-50 to-soft-blue-100">
      <div className="w-full max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{t('title')}</h1>
          <p className="text-slate-600 text-sm">Manage your appointments</p>
        </div>
        
        {/* Elegant Tabs */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 border border-white/50 shadow-sm">
          <div className="flex relative">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 relative z-10 ${
                activeTab === 'upcoming'
                  ? 'bg-gradient-to-r from-soft-blue-500 to-mint-500 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              {t('tabs.upcoming')}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 relative z-10 ${
                activeTab === 'completed'
                  ? 'bg-gradient-to-r from-soft-blue-500 to-mint-500 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              {t('tabs.completed')}
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  {/* Provider Image with elegant styling */}
                  <div className="relative">
                    <img
                      src={booking.providerImage}
                      alt={booking.skillTitle}
                      className="w-16 h-16 rounded-2xl object-cover shadow-md"
                    />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-mint-400 to-soft-blue-400 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white" fill="currentColor" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    {/* Skill Title and Provider */}
                    <h3 className="font-bold text-lg text-slate-800 mb-1">{booking.skillTitle}</h3>
                    <p className="text-slate-600 text-sm mb-3 flex items-center">
                      <User className="w-4 h-4 mr-2 text-soft-blue-500" />
                      {booking.providerName}
                    </p>
                    
                    {/* Booking Details with improved styling */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-slate-600 bg-soft-blue-50/50 rounded-lg p-2">
                        <Calendar className="w-4 h-4 mr-2 text-soft-blue-500" />
                        <span className="font-medium">{new Date(booking.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600 bg-mint-50/50 rounded-lg p-2">
                        <Clock className="w-4 h-4 mr-2 text-mint-500" />
                        <span className="font-medium">{booking.time} ({booking.duration})</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600 bg-slate-50/50 rounded-lg p-2">
                        <MapPin className="w-4 h-4 mr-2 text-slate-500" />
                        <span className="font-medium">{booking.location}</span>
                      </div>
                    </div>
                    
                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="bg-gradient-to-r from-soft-blue-500 to-mint-500 bg-clip-text text-transparent">
                        <span className="text-xl font-bold">${booking.price}</span>
                      </div>
                      
                      {booking.status === 'confirmed' || booking.status === 'pending' ? (
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50 rounded-xl font-medium h-8 px-3"
                          >
                            {t('actions.cancel')}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleRescheduleClick(booking)}
                            className="bg-gradient-to-r from-soft-blue-500 to-mint-500 hover:from-soft-blue-600 hover:to-mint-600 text-white rounded-xl font-medium h-8 px-3 border-0 shadow-md"
                          >
                            {t('actions.reschedule')}
                          </Button>
                        </div>
                      ) : (
                        <div className="bg-gradient-to-r from-green-100 to-mint-100 text-green-700 px-4 py-2 rounded-xl">
                          <span className="text-sm font-semibold flex items-center gap-1">
                            <Star className="w-3 h-3" fill="currentColor" />
                            {t('status.completed')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-soft-blue-100 to-mint-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-soft-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                {activeTab === 'upcoming' ? t('status.no_upcoming') : t('status.no_completed')}
              </h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                {activeTab === 'upcoming' 
                  ? t('status.no_upcoming_desc')
                  : t('status.no_completed_desc')
                }
              </p>
            </div>
          )}
        </div>

        {/* Reschedule Modal */}
        <RescheduleModal
          isOpen={rescheduleModal.isOpen}
          onClose={closeRescheduleModal}
          booking={rescheduleModal.booking}
          onRescheduleSuccess={handleRescheduleSuccess}
        />
      </div>
    </div>
  );
};

export default Bookings;
