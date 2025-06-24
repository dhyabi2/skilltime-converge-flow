
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type UserBadge = Database['public']['Tables']['user_badges']['Row'];
type UserBadgeInsert = Database['public']['Tables']['user_badges']['Insert'];

export const badgesService = {
  async getUserBadges(userId: string) {
    const { data, error } = await supabase
      .from('user_badges')
      .select('*')
      .eq('user_id', userId)
      .order('achieved_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async checkAndAwardBadges(userId: string) {
    // Get user statistics
    const { data: stats } = await supabase
      .from('user_statistics')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!stats) return;

    const badges = [];

    // Early Adopter Badge (first 100 users)
    const { count: userCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    if (userCount && userCount <= 100) {
      badges.push({
        badge: 'Early Adopter',
        description: 'One of the first users to join the platform',
        progress: 1,
        target: 1
      });
    }

    // Skill Master Badge (5+ skills)
    if (stats.total_skills >= 5) {
      badges.push({
        badge: 'Skill Master',
        description: 'Added 5 or more skills to your profile',
        progress: stats.total_skills,
        target: 5
      });
    }

    // Top Rated Badge (4.8+ rating with 10+ reviews)
    if (stats.average_rating >= 4.8 && stats.total_reviews >= 10) {
      badges.push({
        badge: 'Top Rated',
        description: 'Maintained a 4.8+ star rating with 10+ reviews',
        progress: stats.total_reviews,
        target: 10
      });
    }

    // Award new badges
    for (const badge of badges) {
      const { data: existing } = await supabase
        .from('user_badges')
        .select('id')
        .eq('user_id', userId)
        .eq('badge', badge.badge)
        .single();

      if (!existing) {
        await supabase
          .from('user_badges')
          .insert({
            user_id: userId,
            badge: badge.badge,
            description: badge.description,
            progress: badge.progress,
            target: badge.target
          });
      }
    }
  },

  async getBadgeProgress(userId: string) {
    // Calculate progress for unearned badges
    const { data: stats } = await supabase
      .from('user_statistics')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!stats) return [];

    const { data: earnedBadges } = await supabase
      .from('user_badges')
      .select('badge')
      .eq('user_id', userId);

    const earned = earnedBadges?.map(b => b.badge) || [];

    const allBadges = [
      {
        name: 'Early Adopter',
        description: 'One of the first users to join the platform',
        earned: earned.includes('Early Adopter'),
        progress: earned.includes('Early Adopter') ? 100 : 0,
        target: 1
      },
      {
        name: 'Skill Master',
        description: 'Added 5 or more skills to your profile',
        earned: earned.includes('Skill Master'),
        progress: Math.min((stats.total_skills / 5) * 100, 100),
        target: 5
      },
      {
        name: 'Top Rated',
        description: 'Maintained a 4.8+ star rating with 10+ reviews',
        earned: earned.includes('Top Rated'),
        progress: stats.total_reviews >= 10 && stats.average_rating >= 4.8 
          ? 100 
          : Math.min((stats.total_reviews / 10) * 50 + (stats.average_rating / 4.8) * 50, 100),
        target: 10
      }
    ];

    return allBadges;
  }
};
