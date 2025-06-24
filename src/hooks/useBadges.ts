
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { badgesService } from '@/services/supabase/badges';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useUserBadges = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-badges', user?.id],
    queryFn: () => badgesService.getUserBadges(user!.id),
    enabled: !!user?.id,
  });
};

export const useBadgeProgress = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['badge-progress', user?.id],
    queryFn: () => badgesService.getBadgeProgress(user!.id),
    enabled: !!user?.id,
  });
};

export const useCheckBadges = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => badgesService.checkAndAwardBadges(user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-badges'] });
      queryClient.invalidateQueries({ queryKey: ['badge-progress'] });
      queryClient.invalidateQueries({ queryKey: ['user-statistics'] });
      toast({
        title: "Badges Updated",
        description: "Your achievements have been checked",
      });
    },
    onError: (error: any) => {
      console.error('Badge check error:', error);
    },
  });
};
