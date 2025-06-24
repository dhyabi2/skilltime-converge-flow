
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Booking = Database['public']['Tables']['bookings']['Row'];
type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
type BookingUpdate = Database['public']['Tables']['bookings']['Update'];

export const bookingsService = {
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        skills(title, image_url),
        profiles!client_id(name, avatar),
        provider:profiles!provider_id(name, avatar)
      `)
      .or(`client_id.eq.${userId},provider_id.eq.${userId}`)
      .order('booking_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        skills(title, description, image_url),
        profiles!client_id(name, avatar, email),
        provider:profiles!provider_id(name, avatar, email)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(booking: BookingInsert) {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select(`
        *,
        skills(title, image_url),
        profiles!client_id(name),
        provider:profiles!provider_id(name)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: BookingUpdate) {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUpcoming(userId: string) {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        skills(title, image_url),
        profiles!client_id(name, avatar),
        provider:profiles!provider_id(name, avatar)
      `)
      .or(`client_id.eq.${userId},provider_id.eq.${userId}`)
      .gte('booking_date', today)
      .in('status', ['pending', 'confirmed'])
      .order('booking_date', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getCompleted(userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        skills(title, image_url),
        profiles!client_id(name, avatar),
        provider:profiles!provider_id(name, avatar)
      `)
      .or(`client_id.eq.${userId},provider_id.eq.${userId}`)
      .eq('status', 'completed')
      .order('booking_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }
};
