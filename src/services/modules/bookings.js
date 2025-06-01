
// Bookings API module
export const bookingsAPI = {
  getAll: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: '1',
        skillTitle: 'UI/UX Design Consultation',
        providerName: 'Sarah Johnson',
        providerImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
        date: '2024-06-02',
        time: '10:00 AM',
        duration: '1 hour',
        price: 75,
        status: 'confirmed',
        location: 'Remote',
        bookingDate: '2024-06-01T09:00:00Z'
      },
      {
        id: '2',
        skillTitle: 'React Development',
        providerName: 'Mike Chen',
        providerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        date: '2024-06-05',
        time: '2:00 PM',
        duration: '2 hours',
        price: 150,
        status: 'pending',
        location: 'Remote',
        bookingDate: '2024-06-01T14:30:00Z'
      }
    ];
  },

  getById: async (bookingId) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const bookings = await bookingsAPI.getAll();
    const booking = bookings.find(b => b.id === bookingId);
    
    if (!booking) {
      throw new Error('Booking not found');
    }
    
    return booking;
  },

  create: async (bookingData) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      success: true,
      booking: {
        id: Date.now().toString(),
        ...bookingData,
        status: 'pending',
        bookingDate: new Date().toISOString()
      }
    };
  },

  update: async (bookingId, updateData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      booking: {
        id: bookingId,
        ...updateData
      }
    };
  },

  cancel: async (bookingId, reason) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Booking cancelled successfully',
      refundAmount: 75
    };
  },

  reschedule: async (bookingId, newDateTime) => {
    await new Promise(resolve => setTimeout(resolve, 900));
    
    return {
      success: true,
      message: 'Booking rescheduled successfully',
      newDateTime
    };
  },

  getUpcoming: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const allBookings = await bookingsAPI.getAll(userId);
    return allBookings.filter(booking => 
      booking.status === 'confirmed' && new Date(booking.date) > new Date()
    );
  },

  getPast: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const allBookings = await bookingsAPI.getAll(userId);
    return allBookings.filter(booking => 
      new Date(booking.date) < new Date()
    );
  }
};
