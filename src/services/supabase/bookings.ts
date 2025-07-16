
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
        skills!skill_id(title, image_url, description),
        client:profiles!client_id(name, phone, avatar),
        provider:profiles!provider_id(name, phone, avatar)
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
        skills!skill_id(title, image_url, description),
        client:profiles!client_id(name, phone, avatar),
        provider:profiles!provider_id(name, phone, avatar)
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

  async getUserBookings(userId: string) {
    console.log('Fetching user bookings for:', userId);
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        skills!skill_id(title, image_url, description),
        client:profiles!client_id(name, phone, avatar),
        provider:profiles!provider_id(name, phone, avatar)
      `)
      .or(`client_id.eq.${userId},provider_id.eq.${userId}`)
      .order('booking_date', { ascending: true });

    console.log('User bookings result:', { data, error });

    if (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
    
    return data || [];
  }
};
