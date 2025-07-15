
import { useQuery } from '@tanstack/react-query';
import { skillDetailsService } from '@/services/supabase/skillDetails';

export const useSkillDetails = (skillId?: string) => {
  return useQuery({
    queryKey: ['skill-details', skillId],
    queryFn: () => skillDetailsService.getById(skillId!),
    enabled: !!skillId,
  });
};

export const useSkillAvailableSlots = (skillId?: string, date?: string) => {
  return useQuery({
    queryKey: ['skill-available-slots', skillId, date],
    queryFn: () => skillDetailsService.getAvailableSlots(skillId!, date!),
    enabled: !!skillId && !!date,
  });
};

export const useSkillReviews = (skillId?: string) => {
  return useQuery({
    queryKey: ['skill-reviews', skillId],
    queryFn: () => skillDetailsService.getReviews(skillId!),
    enabled: !!skillId,
  });
};

export const useSkillReviewStats = (skillId?: string) => {
  return useQuery({
    queryKey: ['skill-review-stats', skillId],
    queryFn: () => skillDetailsService.getReviewStats(skillId!),
    enabled: !!skillId,
  });
};
