
import { supabase } from '@/integrations/supabase/client';

export const userStatisticsService = {
  async getUserStatistics(userId: string) {
    const { data, error } = await supabase
      .from('user_statistics')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user statistics:', error);
      // Return default stats if view doesn't have data
      return {
        user_id: userId,
        name: '',
        total_skills: 0,
        total_bookings: 0,
        total_reviews: 0,
        average_rating: 0,
        total_badges: 0
      };
    }

    return data;
  },

  async refreshUserStatistics(userId: string) {
    // Since user_statistics is a view, we just need to fetch fresh data
    // The view automatically calculates current statistics
    return this.getUserStatistics(userId);
  }
};
