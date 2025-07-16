
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Booking = Database['public']['Tables']['bookings']['Row'];
type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
type BookingUpdate = Database['public']['Tables']['bookings']['Update'];

export const bookingsService = {
  async getById(id: string) {
    console.log('Fetching booking with ID:', id);
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        skills!fk_bookings_skill_id(title, image_url, description),
        client:profiles!fk_bookings_client_id(name, phone, avatar),
        provider:profiles!fk_bookings_provider_id(name, phone, avatar)
      `)
      .eq('id', id)
      .single();

    console.log('Booking query result:', { data, error });

    if (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
    
    return data;
  },

  async getBookingById(id: string) {
    // Alias for getById to maintain compatibility
    return this.getById(id);
  },

  async create(booking: BookingInsert) {
    console.log('Creating booking:', booking);
    
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        ...booking,
        status: 'pending'
      })
      .select(`
        *,
        skills!fk_bookings_skill_id(title, image_url, description),
        client:profiles!fk_bookings_client_id(name, phone, avatar),
        provider:profiles!fk_bookings_provider_id(name, phone, avatar)
      `)
      .single();

    console.log('Booking creation result:', { data, error });

    if (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
    
    return data;
  },

  async updateStatus(id: string, status: string) {
    console.log('Updating booking status:', { id, status });
    
    const { data, error } = await supabase
      .from('bookings')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    console.log('Booking status update result:', { data, error });

    if (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
    
    return data;
  },

  async updateBookingStatus(id: string, status: string) {
    // Alias for updateStatus to maintain compatibility
    return this.updateStatus(id, status);
  },

  async update(id: string, updates: BookingUpdate) {
    console.log('Updating booking:', { id, updates });
    
    const { data, error } = await supabase
      .from('bookings')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        skills!fk_bookings_skill_id(title, image_url, description),
        client:profiles!fk_bookings_client_id(name, phone, avatar),
        provider:profiles!fk_bookings_provider_id(name, phone, avatar)
      `)
      .single();

    console.log('Booking update result:', { data, error });

    if (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
    
    return data;
  },

  async getAll(userId: string) {
    return this.getUserBookings(userId);
  },

  async getUpcoming(userId: string) {
    console.log('Fetching upcoming bookings for user:', userId);
    
    // Get current date and time for comparison
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format
    
    console.log('Current date:', currentDate, 'Current time:', currentTime);
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        skills!fk_bookings_skill_id(title, image_url, description),
        client:profiles!fk_bookings_client_id(name, phone, avatar),
        provider:profiles!fk_bookings_provider_id(name, phone, avatar)
      `)
      .or(`client_id.eq.${userId},provider_id.eq.${userId}`)
      .in('status', ['pending', 'confirmed'])
      .or(`booking_date.gt.${currentDate},and(booking_date.eq.${currentDate},booking_time.gt.${currentTime})`)
      .order('booking_date', { ascending: true })
      .order('booking_time', { ascending: true });

    console.log('Upcoming bookings query result:', { data, error, userId });

    if (error) {
      console.error('Error fetching upcoming bookings:', error);
      throw error;
    }
    
    return data || [];
  },

  async getCompleted(userId: string) {
    console.log('Fetching completed bookings for user:', userId);
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        skills!fk_bookings_skill_id(title, image_url, description),
        client:profiles!fk_bookings_client_id(name, phone, avatar),
        provider:profiles!fk_bookings_provider_id(name, phone, avatar)
      `)
      .or(`client_id.eq.${userId},provider_id.eq.${userId}`)
      .eq('status', 'completed')
      .order('booking_date', { ascending: false });

    console.log('Completed bookings query result:', { data, error, userId });

    if (error) {
      console.error('Error fetching completed bookings:', error);
      throw error;
    }
    
    return data || [];
  },

  async rescheduleBooking(id: string, newDate: string, newTime: string) {
    console.log('Rescheduling booking:', { id, newDate, newTime });
    
    const { data, error } = await supabase
      .from('bookings')
      .update({
        booking_date: newDate,
        booking_time: newTime,
        status: 'pending',
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        skills!fk_bookings_skill_id(title, image_url, description),
        client:profiles!fk_bookings_client_id(name, phone, avatar),
        provider:profiles!fk_bookings_provider_id(name, phone, avatar)
      `)
      .single();

    console.log('Reschedule booking result:', { data, error });

    if (error) {
      console.error('Error rescheduling booking:', error);
      throw error;
    }
    
    return data;
  },

  async getUserBookings(userId: string) {
    console.log('Fetching all user bookings for:', userId);
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        skills!fk_bookings_skill_id(title, image_url, description),
        client:profiles!fk_bookings_client_id(name, phone, avatar),
        provider:profiles!fk_bookings_provider_id(name, phone, avatar)
      `)
      .or(`client_id.eq.${userId},provider_id.eq.${userId}`)
      .order('booking_date', { ascending: false });

    console.log('All user bookings result:', { data, error, userId });

    if (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
    
    return data || [];
  }
};
