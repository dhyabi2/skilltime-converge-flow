
import { supabase } from '@/integrations/supabase/client';

export const userStatisticsService = {
  async getUserStatistics(userId: string) {
    // Get user's skills count
    const { data: skillsData, error: skillsError } = await supabase
      .from('skills')
      .select('id')
      .eq('provider_id', userId)
      .eq('is_active', true);

    if (skillsError) throw skillsError;

    // Get user's bookings count (both as client and provider)
    const { data: bookingsData, error: bookingsError } = await supabase
      .from('bookings')
      .select('id')
      .or(`client_id.eq.${userId},provider_id.eq.${userId}`);

    if (bookingsError) throw bookingsError;

    // Get user's reviews and average rating
    const { data: reviewsData, error: reviewsError } = await supabase
      .from('reviews')
      .select('rating')
      .in('skill_id', (skillsData || []).map(skill => skill.id));

    if (reviewsError) throw reviewsError;

    // Get user's badges count
    const { data: badgesData, error: badgesError } = await supabase
      .from('user_badges')
      .select('id')
      .eq('user_id', userId);

    if (badgesError) throw badgesError;

    // Calculate statistics
    const totalSkills = skillsData?.length || 0;
    const totalBookings = bookingsData?.length || 0;
    const totalReviews = reviewsData?.length || 0;
    const totalBadges = badgesData?.length || 0;
    
    const averageRating = totalReviews > 0 
      ? reviewsData.reduce((sum, review) => sum + (review.rating || 0), 0) / totalReviews
      : 0;

    return {
      total_skills: totalSkills,
      total_bookings: totalBookings,
      total_reviews: totalReviews,
      average_rating: Number(averageRating.toFixed(1)),
      total_badges: totalBadges
    };
  },

  async updateUserStatistics(userId: string) {
    const stats = await this.getUserStatistics(userId);
    
    // Update or insert into user_statistics view/table if needed
    // This could be a materialized view that gets refreshed periodically
    const { error } = await supabase
      .from('user_statistics')
      .upsert({
        user_id: userId,
        ...stats,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
    return stats;
  }
};
