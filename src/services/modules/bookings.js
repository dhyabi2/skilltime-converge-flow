
// Bookings API module
export const bookingsAPI = {
  create: async (bookingData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      id: Date.now().toString(),
      ...bookingData,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      paymentStatus: 'paid'
    };
  },

  getUserBookings: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 900));
    
    return [
      {
        id: '1',
        skillTitle: 'UI/UX Design Consultation',
        providerName: 'Sarah Johnson',
        date: '2024-06-02',
        time: '10:00 AM',
        duration: '1 hour',
        price: 75,
        status: 'upcoming',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400'
      },
      {
        id: '2',
        skillTitle: 'React Development',
        providerName: 'Mike Chen',
        date: '2024-05-28',
        time: '2:00 PM',
        duration: '2 hours',
        price: 85,
        status: 'completed',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400'
      }
    ];
  },

  cancel: async (bookingId) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, message: 'Booking cancelled successfully' };
  },

  reschedule: async (bookingId, newSlot) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { 
      success: true, 
      message: 'Booking rescheduled successfully',
      newSlot: {
        date: newSlot.date,
        time: newSlot.time,
        updatedAt: new Date().toISOString()
      }
    };
  },

  getAvailableSlots: async (skillId, date) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return [
      { time: '9:00 AM', available: true },
      { time: '10:00 AM', available: false },
      { time: '11:00 AM', available: true },
      { time: '2:00 PM', available: true },
      { time: '3:00 PM', available: true },
      { time: '4:00 PM', available: false }
    ];
  }
};
