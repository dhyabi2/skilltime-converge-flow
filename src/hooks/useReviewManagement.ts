
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsService } from '@/services/supabase/reviews';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (reviewData: {
      skill_id: string;
      rating: number;
      comment: string;
    }) => reviewsService.create({
      ...reviewData,
      reviewer_id: user!.id,
    }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['skill-reviews', variables.skill_id] });
      queryClient.invalidateQueries({ queryKey: ['skill-review-stats', variables.skill_id] });
      queryClient.invalidateQueries({ queryKey: ['provider-reviews'] });
      toast({
        title: "Success",
        description: "Review submitted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit review",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ reviewId, updates }: { reviewId: string; updates: any }) =>
      reviewsService.update(reviewId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill-reviews'] });
      queryClient.invalidateQueries({ queryKey: ['provider-reviews'] });
      toast({
        title: "Success",
        description: "Review updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update review",
        variant: "destructive",
      });
    },
  });
};

export const useReviewVoting = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ reviewId, voteType }: { reviewId: string; voteType: 'up' | 'down' }) =>
      reviewsService.vote(reviewId, user!.id, voteType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill-reviews'] });
      queryClient.invalidateQueries({ queryKey: ['provider-reviews'] });
      toast({
        title: "Success",
        description: "Vote recorded",
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
