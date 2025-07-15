
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Booking = Database['public']['Tables']['bookings']['Row'];
type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
type BookingUpdate = Database['public']['Tables']['bookings']['Update'];

export const freeBookingsService = {
  async create(booking: BookingInsert) {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        ...booking,
        status: 'pending'
      })
      .select(`
        *,
        skills!skill_id(title, image_url),
        client:profiles!client_id(name, phone),
        provider:profiles!provider_id(name, phone)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async confirmBooking(id: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ 
        status: 'confirmed',
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAvailableSlots(skillId: string, date: string) {
    // Mock implementation - in real app this would check provider availability
    // and existing bookings for the date
    const allSlots = [
      '09:00', '10:00', '11:00', '12:00',
      '14:00', '15:00', '16:00', '17:00'
    ];

    // For demo purposes, return all slots
    // In real implementation, filter out booked slots
    return allSlots;
  },

  async createNotification(bookingId: string, recipientId: string, type: string, message: string) {
    const { data, error } = await supabase
      .from('booking_notifications')
      .insert({
        booking_id: bookingId,
        recipient_id: recipientId,
        type,
        message
      });

    if (error) throw error;
    return data;
  }
};
