
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsService } from '@/services/supabase/reviews';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useProviderReviews = (providerId?: string) => {
  return useQuery({
    queryKey: ['provider-reviews', providerId],
    queryFn: () => reviewsService.getByProvider(providerId!),
    enabled: !!providerId,
  });
};

export const useReview = (reviewId: string) => {
  return useQuery({
    queryKey: ['review', reviewId],
    queryFn: () => reviewsService.getById(reviewId),
    enabled: !!reviewId,
  });
};

export const useVoteReview = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ reviewId, voteType }: { reviewId: string; voteType: 'up' | 'down' }) =>
      reviewsService.vote(reviewId, user!.id, voteType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-reviews'] });
      queryClient.invalidateQueries({ queryKey: ['review'] });
      toast({
        title: "Success",
        description: "Your vote has been recorded",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to vote",
        variant: "destructive",
      });
    },
  });
};

export const useRespondToReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ reviewId, response }: { reviewId: string; response: string }) =>
      reviewsService.addResponse(reviewId, response),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-reviews'] });
      queryClient.invalidateQueries({ queryKey: ['review'] });
      toast({
        title: "Success",
        description: "Response added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add response",
        variant: "destructive",
      });
    },
  });
};

export const useReviewStatistics = (providerId?: string) => {
  return useQuery({
    queryKey: ['review-statistics', providerId],
    queryFn: () => reviewsService.getStatistics(providerId!),
    enabled: !!providerId,
  });
};
