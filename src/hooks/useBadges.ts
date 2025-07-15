
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

export const useCheckBadges = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => badgesService.checkAndAwardBadges(user!.id),
    onSuccess: (badges) => {
      if (badges.length > 0) {
        badges.forEach(badge => {
          toast({
            title: "🏆 New Badge Earned!",
            description: `You've earned the "${badge.badge}" badge`,
          });
        });
      }
      
      queryClient.invalidateQueries({ queryKey: ['user-badges'] });
      queryClient.invalidateQueries({ queryKey: ['user-statistics'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error: any) => {
      console.error('Badge check error:', error);
    },
  });
};
