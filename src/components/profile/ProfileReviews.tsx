
import React from 'react';
import { Star, MessageCircle, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProfileReviewsProps {
  userId: string;
}

const ProfileReviews: React.FC<ProfileReviewsProps> = ({ userId }) => {
  // Mock data - replace with actual data fetching
  const mockReviews = {
    received: [
      {
        id: '1',
        rating: 5,
        comment: 'Excellent web development skills! Very professional and delivered exactly what I needed.',
        reviewerName: 'Sarah Johnson',
        reviewerAvatar: '/placeholder.svg',
        skillTitle: 'Web Development',
        date: '2024-06-20',
        helpful: 3
      },
      {
        id: '2',
        rating: 4,
        comment: 'Great photography session. Very creative and patient with my requests.',
        reviewerName: 'Mike Chen',
        reviewerAvatar: '/placeholder.svg',
        skillTitle: 'Photography',
        date: '2024-06-15',
        helpful: 1
      }
    ],
    given: [
      {
        id: '3',
        rating: 5,
        comment: 'Amazing guitar teacher! Really helped me improve my technique.',
        providerName: 'David Martinez',
        providerAvatar: '/placeholder.svg',
        skillTitle: 'Guitar Lessons',
        date: '2024-06-18',
        helpful: 0
      }
    ]
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const ReviewCard = ({ review, type }: { review: any, type: 'received' | 'given' }) => (
    <Card className="mb-3 sm:mb-4">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <Avatar className="w-8 h-8 sm:w-12 sm:h-12 shrink-0">
            <AvatarImage 
              src={type === 'received' ? review.reviewerAvatar : review.providerAvatar} 
              alt={type === 'received' ? review.reviewerName : review.providerName} 
            />
            <AvatarFallback className="text-xs sm:text-sm">
              {(type === 'received' ? review.reviewerName : review.providerName)?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <div className="mb-1 sm:mb-0">
                <h4 className="font-semibold text-slate-800 text-sm sm:text-base">
                  {type === 'received' ? review.reviewerName : review.providerName}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">{review.skillTitle}</p>
              </div>
              <div className="text-left sm:text-right">
                <div className="flex items-center space-x-1 mb-1">
                  {renderStars(review.rating)}
                </div>
                <p className="text-xs text-slate-500">{review.date}</p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-2 sm:mb-3 text-sm">{review.comment}</p>
            
            <div className="flex items-center space-x-4 text-xs sm:text-sm text-slate-500">
              <button className="flex items-center space-x-1 hover:text-slate-700">
                <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const averageRating = mockReviews.received.length > 0 
    ? mockReviews.received.reduce((sum, review) => sum + review.rating, 0) / mockReviews.received.length 
    : 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1 sm:mb-2">Reviews</h2>
        <p className="text-slate-600 text-sm">See what others say about your services and share your experiences</p>
      </div>

      {/* Rating Summary */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600">Overall Rating</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                {mockReviews.received.length}
              </div>
              <p className="text-xs sm:text-sm text-slate-600">Reviews Received</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                {mockReviews.given.length}
              </div>
              <p className="text-xs sm:text-sm text-slate-600">Reviews Given</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="received" className="w-full">
        <TabsList className="w-full h-auto p-1">
          <div className="flex w-full">
            <TabsTrigger value="received" className="flex-1 text-xs sm:text-sm px-2 py-2">
              Reviews Received
            </TabsTrigger>
            <TabsTrigger value="given" className="flex-1 text-xs sm:text-sm px-2 py-2">
              Reviews Given
            </TabsTrigger>
          </div>
        </TabsList>
        
        <TabsContent value="received" className="mt-4 sm:mt-6">
          {mockReviews.received.length === 0 ? (
            <Card>
              <CardContent className="text-center py-6 sm:py-8">
                <Star className="w-8 h-8 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">No reviews yet</h3>
                <p className="text-slate-600 text-sm">Reviews from your clients will appear here</p>
              </CardContent>
            </Card>
          ) : (
            <div>
              {mockReviews.received.map((review) => (
                <ReviewCard key={review.id} review={review} type="received" />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="given" className="mt-4 sm:mt-6">
          {mockReviews.given.length === 0 ? (
            <Card>
              <CardContent className="text-center py-6 sm:py-8">
                <MessageCircle className="w-8 h-8 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">No reviews given</h3>
                <p className="text-slate-600 text-sm">Reviews you've written will appear here</p>
              </CardContent>
            </Card>
          ) : (
            <div>
              {mockReviews.given.map((review) => (
                <ReviewCard key={review.id} review={review} type="given" />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileReviews;
