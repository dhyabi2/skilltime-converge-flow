
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Review = Database['public']['Tables']['reviews']['Row'];
type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];
type ReviewUpdate = Database['public']['Tables']['reviews']['Update'];

export const reviewsService = {
  async getByProvider(providerId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles!reviewer_id(name, avatar),
        skills(title, provider_id)
      `)
      .eq('skills.provider_id', providerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getBySkill(skillId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles!reviewer_id(name, avatar)
      `)
      .eq('skill_id', skillId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles!reviewer_id(name, avatar),
        skills(title, provider_id)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(review: ReviewInsert) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select(`
        *,
        profiles!reviewer_id(name, avatar),
        skills(title, provider_id)
      `)
      .single();

    if (error) throw error;

    // Create notification for skill provider
    if (data.skills?.provider_id) {
      await supabase
        .from('notifications')
        .insert({
          user_id: data.skills.provider_id,
          type: 'new_review',
          title: 'New Review Received',
          message: `You received a ${data.rating}-star review for "${data.skills.title}"`,
          data: { 
            review_id: data.id,
            skill_id: data.skill_id,
            rating: data.rating 
          }
        });
    }

    return data;
  },

  async update(reviewId: string, updates: ReviewUpdate) {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', reviewId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async addResponse(reviewId: string, response: string) {
    const { data, error } = await supabase
      .from('reviews')
      .update({
        provider_response: response,
        provider_response_date: new Date().toISOString()
      })
      .eq('id', reviewId)
      .select(`
        *,
        profiles!reviewer_id(name, avatar)
      `)
      .single();

    if (error) throw error;

    // Create notification for reviewer
    if (data.reviewer_id) {
      await supabase
        .from('notifications')
        .insert({
          user_id: data.reviewer_id,
          type: 'review_response',
          title: 'Provider Responded',
          message: 'The provider responded to your review',
          data: { 
            review_id: data.id,
            response: response 
          }
        });
    }

    return data;
  },

  async vote(reviewId: string, userId: string, voteType: 'up' | 'down') {
    // First, check if user already voted
    const { data: existingVote } = await supabase
      .from('review_votes')
      .select('vote_type')
      .eq('review_id', reviewId)
      .eq('user_id', userId)
      .single();

    if (existingVote) {
      if (existingVote.vote_type === voteType) {
        // Remove vote if same type
        const { error } = await supabase
          .from('review_votes')
          .delete()
          .eq('review_id', reviewId)
          .eq('user_id', userId);
        if (error) throw error;
      } else {
        // Update vote type
        const { error } = await supabase
          .from('review_votes')
          .update({ vote_type: voteType })
          .eq('review_id', reviewId)
          .eq('user_id', userId);
        if (error) throw error;
      }
    } else {
      // Create new vote
      const { error } = await supabase
        .from('review_votes')
        .insert({
          review_id: reviewId,
          user_id: userId,
          vote_type: voteType
        });
      if (error) throw error;
    }

    // Update review vote counts
    const { data: votes } = await supabase
      .from('review_votes')
      .select('vote_type')
      .eq('review_id', reviewId);

    const upvotes = votes?.filter(v => v.vote_type === 'up').length || 0;
    const downvotes = votes?.filter(v => v.vote_type === 'down').length || 0;

    const { error: updateError } = await supabase
      .from('reviews')
      .update({ upvotes, downvotes })
      .eq('id', reviewId);

    if (updateError) throw updateError;
  },

  async getStatistics(providerId: string) {
    // Get all reviews for provider's skills
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('rating, upvotes, downvotes, skills!inner(provider_id)')
      .eq('skills.provider_id', providerId);

    if (error) throw error;

    const reviewsData = reviews || [];
    const totalReviews = reviewsData.length;
    const averageRating = totalReviews > 0 
      ? reviewsData.reduce((sum, review) => sum + (review.rating || 0), 0) / totalReviews
      : 0;
    const totalUpvotes = reviewsData.reduce((sum, review) => sum + (review.upvotes || 0), 0);

    return {
      totalReviews,
      averageRating: Number(averageRating.toFixed(1)),
      totalUpvotes
    };
  },

  async getUserVote(reviewId: string, userId: string) {
    const { data, error } = await supabase
      .from('review_votes')
      .select('vote_type')
      .eq('review_id', reviewId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data?.vote_type || null;
  },

  async reportReview(reviewId: string, userId: string, reason: string) {
    // This would typically go to a separate reports table
    // For now, we'll create a notification to admins
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: 'admin', // This would be actual admin user IDs
        type: 'review_report',
        title: 'Review Reported',
        message: `Review ${reviewId} was reported for: ${reason}`,
        data: { 
          review_id: reviewId,
          reporter_id: userId,
          reason 
        }
      });

    if (error) throw error;
  }
};
