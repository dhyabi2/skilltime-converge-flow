import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageSquare, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ReviewDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: any;
  onVote: (reviewId: string, voteType: 'up' | 'down') => void;
  onRespond: (reviewId: string, response: string) => void;
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
  const { t } = useTranslation('reviews');
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleSubmitResponse = async () => {
    if (!response.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onRespond(review.id, response);
      setResponse('');
      onClose();
    } catch (error) {
      console.error('Failed to submit response:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!review) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            تفاصيل التقييم
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Review Header */}
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={review.profiles?.avatar} />
              <AvatarFallback className="text-lg">
                {review.profiles?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">
                  {review.profiles?.name || t('anonymous')}
                </h3>
                <Badge variant="outline" className="text-xs">
                  {new Date(review.created_at).toLocaleDateString('ar-OM', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">{renderStars(review.rating || 0)}</div>
                <span className="text-lg font-semibold text-gray-700">
                  {review.rating || 0}/5
                </span>
              </div>
              
              {/* Review Content */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800 leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </div>

          {/* Voting Section */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">{t('helpful')}؟</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onVote(review.id, 'up')}
                className="flex items-center gap-1"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{review.upvotes || 0}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onVote(review.id, 'down')}
                className="flex items-center gap-1"
              >
                <ThumbsDown className="w-4 h-4" />
                <span>{review.downvotes || 0}</span>
              </Button>
            </div>
            <span className="text-sm text-gray-500">
              {(review.upvotes || 0) + (review.downvotes || 0)} شخص وجد هذا مفيداً
            </span>
          </div>

          {/* Existing Response */}
          {review.provider_response && (
            <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-400">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">ردك:</span>
                {review.provider_response_date && (
                  <span className="text-xs text-blue-600">
                    {new Date(review.provider_response_date).toLocaleDateString('ar-OM')}
                  </span>
                )}
              </div>
              <p className="text-blue-800">{review.provider_response}</p>
            </div>
          )}

          {/* Response Form */}
          {canRespond && !review.provider_response && (
            <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-800">اكتب رداً على هذا التقييم</h4>
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="شكراً لك على تقييمك... اكتب ردك هنا"
                rows={4}
                className="resize-none"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setResponse('')}
                  disabled={isSubmitting}
                >
                  مسح
                </Button>
                <Button
                  onClick={handleSubmitResponse}
                  disabled={!response.trim() || isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرد'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDetailModal;
