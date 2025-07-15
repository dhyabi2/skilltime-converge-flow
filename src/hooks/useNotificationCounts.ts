
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface NotificationCounts {
  bookings: number;
  reviews: number;
  settings: number;
  total: number;
}

export const useNotificationCounts = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: counts = { bookings: 0, reviews: 0, settings: 0, total: 0 }, isLoading } = useQuery({
    queryKey: ['notification-counts', user?.id],
    queryFn: async (): Promise<NotificationCounts> => {
      if (!user?.id) return { bookings: 0, reviews: 0, settings: 0, total: 0 };

      // Get pending bookings count
      const { count: bookingsCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .or(`client_id.eq.${user.id},provider_id.eq.${user.id}`)
        .eq('status', 'pending');

      // Get unread notifications count
      const { count: notificationsCount } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('read', false);

      // Get profile completion status for settings notifications
      const { data: profile } = await supabase
        .from('profiles')
        .select('name, bio, location, phone, avatar')
        .eq('id', user.id)
        .single();

      let settingsCount = 0;
      if (profile) {
        if (!profile.name) settingsCount++;
        if (!profile.bio) settingsCount++;
        if (!profile.location) settingsCount++;
        if (!profile.phone) settingsCount++;
        if (!profile.avatar) settingsCount++;
      }

      const total = (bookingsCount || 0) + (notificationsCount || 0) + settingsCount;

      return {
        bookings: bookingsCount || 0,
        reviews: 0, // Reviews don't have unread status currently
        settings: settingsCount,
        total
      };
    },
    enabled: !!user?.id,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Real-time updates
  useEffect(() => {
    if (!user?.id) return;

    const channels = [
      // Listen to bookings changes
      supabase
        .channel('notification-counts-bookings')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'bookings'
          },
          () => {
            queryClient.invalidateQueries({ queryKey: ['notification-counts', user.id] });
          }
        )
        .subscribe(),

      // Listen to notifications changes
      supabase
        .channel('notification-counts-notifications')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`
          },
          () => {
            queryClient.invalidateQueries({ queryKey: ['notification-counts', user.id] });
          }
        )
        .subscribe(),

      // Listen to profile changes
      supabase
        .channel('notification-counts-profile')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'profiles',
            filter: `id=eq.${user.id}`
          },
          () => {
            queryClient.invalidateQueries({ queryKey: ['notification-counts', user.id] });
          }
        )
        .subscribe()
    ];

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, [user?.id, queryClient]);

  return {
    counts,
    isLoading,
    refetch: () => queryClient.invalidateQueries({ queryKey: ['notification-counts', user?.id] })
  };
};
