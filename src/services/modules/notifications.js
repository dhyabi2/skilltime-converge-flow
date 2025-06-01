
// Notifications API module
export const notificationsAPI = {
  getAll: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: '1',
        type: 'booking_confirmed',
        title: 'Booking Confirmed',
        message: 'Your booking with Sarah Johnson has been confirmed for June 2nd at 10:00 AM.',
        read: false,
        createdAt: '2024-06-01T09:00:00Z',
        data: { bookingId: '1' }
      },
      {
        id: '2',
        type: 'skill_reminder',
        title: 'Upcoming Session',
        message: 'You have a UI/UX session tomorrow at 10:00 AM.',
        read: true,
        createdAt: '2024-06-01T08:00:00Z',
        data: { bookingId: '1' }
      }
    ];
  },

  markAsRead: async (notificationId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      message: 'Notification marked as read'
    };
  },

  markAllAsRead: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      success: true,
      message: 'All notifications marked as read'
    };
  }
};
