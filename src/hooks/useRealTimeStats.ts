
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { userStatisticsService } from '@/services/supabase/userStatistics';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export const useRealTimeStats = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['user-statistics', user?.id],
    queryFn: () => userStatisticsService.getUserStatistics(user!.id),
    enabled: !!user?.id,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Real-time subscriptions for stats updates
  useEffect(() => {
    if (!user?.id) return;

    const channels = [
      // Listen to skills changes
      supabase
        .channel('skills-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'skills',
            filter: `provider_id=eq.${user.id}`
          },
          () => {
            queryClient.invalidateQueries({ queryKey: ['user-statistics', user.id] });
          }
        )
        .subscribe(),

      // Listen to bookings changes
      supabase
        .channel('bookings-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'bookings',
            filter: `provider_id=eq.${user.id}`
          },
          () => {
            queryClient.invalidateQueries({ queryKey: ['user-statistics', user.id] });
          }
        )
        .subscribe(),

      // Listen to reviews changes
      supabase
        .channel('reviews-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'reviews'
          },
          () => {
            queryClient.invalidateQueries({ queryKey: ['user-statistics', user.id] });
          }
        )
        .subscribe(),

      // Listen to badges changes
      supabase
        .channel('badges-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'user_badges',
            filter: `user_id=eq.${user.id}`
          },
          () => {
            queryClient.invalidateQueries({ queryKey: ['user-statistics', user.id] });
          }
        )
        .subscribe()
    ];

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, [user?.id, queryClient]);

  return {
    stats,
    isLoading,
    refetch: () => queryClient.invalidateQueries({ queryKey: ['user-statistics', user?.id] })
  };
};
