
// Date and Time utility functions
export const dateTimeUtils = {
  formatDate: (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  formatTime: (time) => {
    return new Date(`2000-01-01 ${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  },

  isSlotAvailable: (slot, bookedSlots = []) => {
    const slotDateTime = new Date(`${slot.date} ${slot.time}`);
    const now = new Date();
    
    // Check if slot is in the past
    if (slotDateTime < now) return false;
    
    // Check if slot is already booked
    return !bookedSlots.some(booked => 
      booked.date === slot.date && booked.time === slot.time
    );
  },

  generateTimeSlots: (startHour = 9, endHour = 17, intervalMinutes = 60) => {
    const slots = [];
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    
    return slots;
  },

  getAvailableDates: (daysAhead = 30) => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= daysAhead; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  }
};
