
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsService } from '@/services/supabase/notifications';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useNotifications = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: () => notificationsService.getAll(user!.id),
    enabled: !!user,
  });
};

export const useUnreadNotificationsCount = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['notifications', 'unread-count', user?.id],
    queryFn: () => notificationsService.getUnreadCount(user!.id),
    enabled: !!user,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: notificationsService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast({
        title: "Success",
        description: "Notification marked as read",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to mark notification as read",
        variant: "destructive",
      });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: notificationsService.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast({
        title: "Success",
        description: "All notifications marked as read",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to mark notifications as read",
        variant: "destructive",
      });
    },
  });
};
