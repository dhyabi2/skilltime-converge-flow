
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsService } from '@/services/supabase/notifications';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef } from 'react';

export const useNotifications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: () => notificationsService.getNotifications(user!.id),
    enabled: !!user?.id,
  });

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ['notifications-unread-count', user?.id],
    queryFn: () => notificationsService.getUnreadCount(user!.id),
    enabled: !!user?.id,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const markAsReadMutation = useMutation({
    mutationFn: notificationsService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => notificationsService.markAllAsRead(user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
      toast({
        title: "Success",
        description: "All notifications marked as read",
      });
    },
  });

  // Subscribe to real-time notifications
  useEffect(() => {
    if (!user?.id) return;

    const setupSubscription = async () => {
      try {
        const unsubscribe = await notificationsService.subscribeToNotifications(
          user.id,
          (notification) => {
            // Show toast for new notification
            toast({
              title: notification.title,
              description: notification.message,
            });

            // Refresh queries
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
          }
        );
        
        unsubscribeRef.current = unsubscribe;
      } catch (error) {
        console.error('Failed to setup notification subscription:', error);
      }
    };

    setupSubscription();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [user?.id, queryClient, toast]);

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
    isMarkingAsRead: markAsReadMutation.isPending,
    isMarkingAllAsRead: markAllAsReadMutation.isPending,
  };
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationsService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: () => notificationsService.markAllAsRead(user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    },
  });
};
