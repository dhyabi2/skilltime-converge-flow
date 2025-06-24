
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Reply, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ReviewDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: any;
  onVote?: (reviewId: string, voteType: 'up' | 'down') => void;
  onRespond?: (reviewId: string, response: string) => void;
  canRespond?: boolean;
}

const ReviewDetailModal: React.FC<ReviewDetailModalProps> = ({
  isOpen,
  onClose,
  review,
  onVote,
  onRespond,
  canRespond = false
}) => {
  const { t } = useTranslation('profile');
  const [response, setResponse] = useState('');
  const [showResponseForm, setShowResponseForm] = useState(false);

  if (!review) return null;

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

  const handleResponse = () => {
    if (onRespond && response.trim()) {
      onRespond(review.id, response);
      setResponse('');
      setShowResponseForm(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Reviewer Info */}
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={review.profiles?.avatar} />
              <AvatarFallback>{review.profiles?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{review.profiles?.name}</p>
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(review.rating)}</div>
                <span className="text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-800">{review.comment}</p>
          </div>

          {/* Provider Response */}
          {review.provider_response && (
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <div className="flex items-center gap-2 mb-2">
                <Reply className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">Provider Response</span>
                <span className="text-sm text-blue-600">
                  {new Date(review.provider_response_date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-blue-800">{review.provider_response}</p>
            </div>
          )}

          {/* Response Form */}
          {canRespond && !review.provider_response && (
            <div className="space-y-3">
              {!showResponseForm ? (
                <Button 
                  variant="outline" 
                  onClick={() => setShowResponseForm(true)}
                  className="w-full"
                >
                  <Reply className="w-4 h-4 mr-2" />
                  Respond to Review
                </Button>
              ) : (
                <div className="space-y-3">
                  <Textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Write your response..."
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleResponse} disabled={!response.trim()}>
                      Post Response
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowResponseForm(false);
                        setResponse('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Voting */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onVote?.(review.id, 'up')}
                className="flex items-center gap-1"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{review.upvotes || 0}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onVote?.(review.id, 'down')}
                className="flex items-center gap-1"
              >
                <ThumbsDown className="w-4 h-4" />
                <span>{review.downvotes || 0}</span>
              </Button>
            </div>
            <span className="text-sm text-gray-500">
              {(review.upvotes || 0) + (review.downvotes || 0)} people found this helpful
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDetailModal;
