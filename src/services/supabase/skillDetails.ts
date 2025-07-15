
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Skill = Database['public']['Tables']['skills']['Row'];

export const skillDetailsService = {
  async getById(id: string) {
    const { data, error } = await supabase
      .from('skills')
      .select(`
        *,
        profiles!provider_id(name, avatar, bio, location),
        categories(title),
        subcategories(title),
        skill_availability(*)
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  },

  async getAvailableSlots(skillId: string, date: string) {
    const { data, error } = await supabase.rpc('get_available_time_slots', {
      p_skill_id: skillId,
      p_date: date
    });

    if (error) throw error;
    return data || [];
  },

  async checkAvailability(skillId: string, date: string, time: string, duration: string) {
    const { data, error } = await supabase.rpc('check_booking_availability', {
      p_skill_id: skillId,
      p_booking_date: date,
      p_booking_time: time,
      p_duration: duration
    });

    if (error) throw error;
    return data;
  },

  async getReviews(skillId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles!reviewer_id(name, avatar)
      `)
      .eq('skill_id', skillId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getReviewStats(skillId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('skill_id', skillId);

    if (error) throw error;

    const reviews = data || [];
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 
      ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / totalReviews
      : 0;

    return {
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      ratingDistribution: {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length,
      }
    };
  }
};
