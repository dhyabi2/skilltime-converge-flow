
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { bookingsAPI } from '../services';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const { t } = useTranslation('bookings');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // Mock user ID - in real app, get from auth context
      const userBookings = await bookingsAPI.getUserBookings('1');
      setBookings(userBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await bookingsAPI.cancel(bookingId);
      // Refresh bookings
      fetchBookings();
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const getFilteredBookings = () => {
    return bookings.filter(booking => 
      activeTab === 'upcoming' ? booking.status === 'upcoming' : booking.status === 'completed'
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">{t('status.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-black mb-6">{t('title')}</h1>
        
        {/* Tabs */}
        <div className="flex bg-gray-200 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            {t('tabs.upcoming')}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'completed'
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            {t('tabs.completed')}
          </button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {getFilteredBookings().length > 0 ? (
            getFilteredBookings().map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <img
                    src={booking.image}
                    alt={booking.skillTitle}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-black mb-1">{booking.skillTitle}</h3>
                    <p className="text-gray-600 text-sm mb-3 flex items-center">
                      <User className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                      {booking.providerName}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                        <span>{new Date(booking.date).toLocaleDateString('ar-SA', { 
                          weekday: 'long', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                        <span>{booking.time} ({booking.duration})</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-lg font-bold text-black">${booking.price}</span>
                      {booking.status === 'upcoming' && (
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            {t('actions.cancel')}
                          </Button>
                          <Button
                            size="sm"
                            className="bg-black hover:bg-gray-800"
                          >
                            {t('actions.reschedule')}
                          </Button>
                        </div>
                      )}
                      {booking.status === 'completed' && (
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                          {t('status.completed')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {activeTab === 'upcoming' ? t('status.no_upcoming') : t('status.no_completed')}
              </h3>
              <p className="text-gray-600">
                {activeTab === 'upcoming' 
                  ? t('status.no_upcoming_desc')
                  : t('status.no_completed_desc')
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
