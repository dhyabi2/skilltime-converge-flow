
import { supabase } from '@/integrations/supabase/client';

export const badgesService = {
  async checkAndAwardBadges(userId: string) {
    try {
      // Get user statistics for badge calculations
      const stats = await this.getUserStats(userId);
      const badges = await this.getEligibleBadges(stats);
      
      // Award new badges
      for (const badge of badges) {
        await this.awardBadge(userId, badge);
      }

      return badges;
    } catch (error) {
      console.error('Badge checking error:', error);
      throw error;
    }
  },

  async getUserStats(userId: string) {
    // Get skills count
    const { data: skills } = await supabase
      .from('skills')
      .select('id')
      .eq('provider_id', userId)
      .eq('is_active', true);

    // Get completed bookings
    const { data: bookings } = await supabase
      .from('bookings')
      .select('id')
      .eq('provider_id', userId)
      .eq('status', 'completed');

    // Get average rating
    const { data: reviews } = await supabase
      .from('reviews')
      .select('rating')
      .in('skill_id', (skills || []).map(s => s.id));

    const averageRating = reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
      : 0;

    return {
      skillsCount: skills?.length || 0,
      bookingsCount: bookings?.length || 0,
      reviewsCount: reviews?.length || 0,
      averageRating
    };
  },

  async getEligibleBadges(stats: any) {
    const badges = [];

    // First Skill Badge
    if (stats.skillsCount >= 1) {
      badges.push({
        badge: 'First Skill',
        description: 'Created your first skill'
      });
    }

    // Skill Master Badge
    if (stats.skillsCount >= 5) {
      badges.push({
        badge: 'Skill Master',
        description: 'Created 5 or more skills'
      });
    }

    // First Booking Badge
    if (stats.bookingsCount >= 1) {
      badges.push({
        badge: 'First Booking',
        description: 'Completed your first booking'
      });
    }

    // Top Rated Badge
    if (stats.averageRating >= 4.5 && stats.reviewsCount >= 5) {
      badges.push({
        badge: 'Top Rated',
        description: 'Maintained 4.5+ star rating with 5+ reviews'
      });
    }

    // Expert Badge
    if (stats.skillsCount >= 3 && stats.averageRating >= 4.0) {
      badges.push({
        badge: 'Expert',
        description: 'Multiple skills with high ratings'
      });
    }

    return badges;
  },

  async awardBadge(userId: string, badge: any) {
    // Check if badge already exists
    const { data: existing } = await supabase
      .from('user_badges')
      .select('id')
      .eq('user_id', userId)
      .eq('badge', badge.badge)
      .single();

    if (existing) return; // Badge already awarded

    // Award the badge
    const { error } = await supabase
      .from('user_badges')
      .insert({
        user_id: userId,
        badge: badge.badge,
        description: badge.description,
        achieved_at: new Date().toISOString()
      });

    if (error) throw error;

    // Create notification for new badge
    await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type: 'badge_earned',
        title: 'New Badge Earned!',
        message: `You've earned the "${badge.badge}" badge`,
        data: { badge: badge.badge }
      });
  },

  async getUserBadges(userId: string) {
    const { data, error } = await supabase
      .from('user_badges')
      .select('*')
      .eq('user_id', userId)
      .order('achieved_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
};
