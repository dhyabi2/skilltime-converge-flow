
import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ReviewDetailModal from './modals/ReviewDetailModal';

interface ProfileReviewsProps {
  userId: string;
}

const ProfileReviews: React.FC<ProfileReviewsProps> = ({ userId }) => {
  const { t } = useTranslation('profile');
  const [selectedReview, setSelectedReview] = useState<any>(null);

  // Mock data - would be replaced with real data
  const mockReviews = [
    {
      id: 'review-1',
      rating: 5,
      comment: 'Absolutely fantastic React mentoring session! Jane explained complex concepts in a very understandable way. Her teaching style is engaging and she provided practical examples that really helped solidify my understanding.',
      created_at: '2024-01-10T10:00:00Z',
      upvotes: 12,
      downvotes: 0,
      provider_response: 'Thank you so much for the kind words! It was a pleasure working with you. Keep up the great work with React!',
      provider_response_date: '2024-01-11T14:30:00Z',
      profiles: {
        name: 'John Doe',
        avatar: '/placeholder.svg'
      }
    },
    {
      id: 'review-2',
      rating: 4,
      comment: 'Great UI/UX consultation. Sarah gave me valuable insights into modern design principles and helped me improve my portfolio. Highly recommend!',
      created_at: '2024-01-05T15:30:00Z',
      upvotes: 8,
      downvotes: 1,
      provider_response: null,
      provider_response_date: null,
      profiles: {
        name: 'Mike Johnson',
        avatar: '/placeholder.svg'
      }
    },
    {
      id: 'review-3',
      rating: 5,
      comment: 'Bob is an excellent JavaScript instructor. The session was well-structured and covered advanced concepts that I\'ve been struggling with. Worth every penny!',
      created_at: '2024-01-02T09:15:00Z',
      upvotes: 15,
      downvotes: 0,
      provider_response: 'I\'m so glad the session was helpful! JavaScript can be tricky, but you\'re doing great. Feel free to reach out if you have more questions.',
      provider_response_date: '2024-01-02T18:00:00Z',
      profiles: {
        name: 'Alice Brown',
        avatar: '/placeholder.svg'
      }
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleReviewClick = (review: any) => {
    setSelectedReview(review);
  };

  const handleVote = (reviewId: string, voteType: 'up' | 'down') => {
    console.log('Vote on review:', reviewId, voteType);
    // This would call the review service to vote
  };

  const handleRespond = (reviewId: string, response: string) => {
    console.log('Respond to review:', reviewId, response);
    // This would call the review service to add response
  };

  const averageRating = mockReviews.length > 0 
    ? mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length 
    : 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
          <Award className="w-6 h-6 text-yellow-600" />
          Reviews & Feedback
        </h2>
        <p className="text-slate-600 text-sm">See what others say about your services</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md bg-yellow-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</div>
            <p className="text-sm text-gray-600">Average Rating</p>
            <div className="flex justify-center mt-1">{renderStars(Math.round(averageRating))}</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-blue-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{mockReviews.length}</div>
            <p className="text-sm text-gray-600">Total Reviews</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-green-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {mockReviews.reduce((sum, review) => sum + review.upvotes, 0)}
            </div>
            <p className="text-sm text-gray-600">Helpful Votes</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-purple-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {mockReviews.filter(r => r.provider_response).length}
            </div>
            <p className="text-sm text-gray-600">Responses</p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {mockReviews.map((review) => (
          <Card 
            key={review.id} 
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer"
            onClick={() => handleReviewClick(review)}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex gap-4">
                <Avatar className="w-12 h-12 flex-shrink-0">
                  <AvatarImage src={review.profiles.avatar} />
                  <AvatarFallback>{review.profiles.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-slate-800">{review.profiles.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {review.provider_response && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Responded
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-700 line-clamp-3">{review.comment}</p>
                  
                  {review.provider_response && (
                    <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                      <p className="text-sm text-blue-800 font-medium mb-1">Your Response:</p>
                      <p className="text-blue-700 text-sm line-clamp-2">{review.provider_response}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{review.upvotes}</span>
                      </div>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500">
                        {review.upvotes + review.downvotes} found helpful
                      </span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${
                        review.rating >= 4 ? 'border-green-200 text-green-700' : 'border-gray-200'
                      }`}
                    >
                      {review.rating >= 4 ? '⭐ Great' : review.rating >= 3 ? '👍 Good' : '💡 Feedback'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {mockReviews.length === 0 && (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No reviews yet</h3>
          <p className="text-gray-500">Reviews from your clients will appear here.</p>
        </div>
      )}

      {/* Review Detail Modal */}
      {selectedReview && (
        <ReviewDetailModal
          isOpen={true}
          onClose={() => setSelectedReview(null)}
          review={selectedReview}
          onVote={handleVote}
          onRespond={handleRespond}
          canRespond={!selectedReview.provider_response}
        />
      )}
    </div>
  );
};

export default ProfileReviews;
