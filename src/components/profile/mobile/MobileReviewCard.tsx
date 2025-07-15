
import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageSquare, MoreVertical, Flag } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from 'react-i18next';

interface MobileReviewCardProps {
  review: any;
  canRespond?: boolean;
  onVote?: (reviewId: string, voteType: 'up' | 'down') => void;
  onRespond?: (reviewId: string, response: string) => void;
  onReport?: (reviewId: string) => void;
}

const MobileReviewCard: React.FC<MobileReviewCardProps> = ({ 
  review, 
  canRespond = false,
  onVote,
  onRespond,
  onReport
}) => {
  const { t } = useTranslation('profile');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [response, setResponse] = useState('');
  const [hasVoted, setHasVoted] = useState<'up' | 'down' | null>(null);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleVote = (voteType: 'up' | 'down') => {
    if (hasVoted === voteType) return; // Already voted this way
    
    setHasVoted(voteType);
    if (onVote) {
      onVote(review.id, voteType);
    }
  };

  const handleSubmitResponse = () => {
    if (response.trim() && onRespond) {
      onRespond(review.id, response.trim());
      setResponse('');
      setIsResponding(false);
    }
  };

  const shouldTruncate = review.comment && review.comment.length > 150;
  const displayComment = shouldTruncate && !isExpanded 
    ? review.comment.substring(0, 150) + '...' 
    : review.comment;

  return (
    <Card className="border border-slate-200 hover:border-blue-300 transition-all duration-200 mb-3">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex gap-3 mb-3">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src={review.profiles?.avatar} />
            <AvatarFallback className="bg-blue-100 text-blue-800 text-sm">
              {review.profiles?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-800 text-sm truncate">
                  {review.profiles?.name || t('reviews.anonymous')}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">{renderStars(review.rating || 0)}</div>
                  <span className="text-xs text-gray-500">
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0">
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  {onReport && (
                    <DropdownMenuItem onClick={() => onReport(review.id)} className="cursor-pointer text-red-600">
                      <Flag className="w-3 h-3 mr-2" />
                      Report
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        {/* Review Content */}
        <div className="mb-3">
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            {displayComment}
          </p>
          
          {shouldTruncate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </Button>
          )}
        </div>

        {/* Provider Response */}
        {review.provider_response && (
          <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400 mb-3">
            <div className="flex items-center gap-1 mb-1">
              <MessageSquare className="w-3 h-3 text-blue-600" />
              <p className="text-xs text-blue-800 font-medium">{t('reviews.your_response')}</p>
            </div>
            <p className="text-sm text-blue-700">{review.provider_response}</p>
          </div>
        )}

        {/* Response Input */}
        {isResponding && (
          <div className="mb-3 space-y-2">
            <Textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder={t('reviews.write_response')}
              className="text-sm resize-none"
              rows={3}
            />
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={handleSubmitResponse}
                disabled={!response.trim()}
                className="text-xs"
              >
                Post Response
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setIsResponding(false);
                  setResponse('');
                }}
                className="text-xs"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-3">
            {/* Vote Buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('up')}
                className={`h-7 px-2 text-xs ${hasVoted === 'up' ? 'text-green-600 bg-green-50' : 'text-gray-500'}`}
              >
                <ThumbsUp className="w-3 h-3 mr-1" />
                {review.upvotes || 0}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('down')}
                className={`h-7 px-2 text-xs ${hasVoted === 'down' ? 'text-red-600 bg-red-50' : 'text-gray-500'}`}
              >
                <ThumbsDown className="w-3 h-3 mr-1" />
                {review.downvotes || 0}
              </Button>
            </div>

            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">
              {(review.upvotes || 0) + (review.downvotes || 0)} votes
            </span>
          </div>

          {/* Response Button */}
          {canRespond && !review.provider_response && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsResponding(true)}
              className="h-7 px-2 text-xs text-blue-600 hover:text-blue-700"
            >
              <MessageSquare className="w-3 h-3 mr-1" />
              Respond
            </Button>
          )}

          {/* Rating Badge */}
          <Badge 
            variant="outline" 
            className={`text-xs ${
              (review.rating || 0) >= 4 ? 'border-green-200 text-green-700 bg-green-50' : 
              (review.rating || 0) >= 3 ? 'border-yellow-200 text-yellow-700 bg-yellow-50' : 
              'border-gray-200 text-gray-600 bg-gray-50'
            }`}
          >
            {(review.rating || 0) >= 4 ? '⭐ Great' : 
             (review.rating || 0) >= 3 ? '👍 Good' : 
             '💡 Feedback'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileReviewCard;
