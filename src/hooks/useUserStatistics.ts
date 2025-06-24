
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userStatisticsService } from '@/services/supabase/userStatistics';
import { useAuth } from '@/contexts/AuthContext';

export const useUserStatistics = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-statistics', user?.id],
    queryFn: () => userStatisticsService.getUserStatistics(user!.id),
    enabled: !!user?.id,
  });
};

export const useRefreshUserStatistics = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const refreshStats = () => {
    if (user?.id) {
      queryClient.invalidateQueries({ queryKey: ['user-statistics', user.id] });
    }
  };

  return refreshStats;
};
