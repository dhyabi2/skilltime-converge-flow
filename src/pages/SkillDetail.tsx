
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, User, Heart, Share2, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSkillDetails } from '@/hooks/useSkillDetails';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { hapticFeedback } from '@/utils/hapticFeedback';

const SkillDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation('skills');
  const { t: tCommon } = useTranslation('common');
  const [isLiked, setIsLiked] = useState(false);
  
  const { data: skill, isLoading, error } = useSkillDetails(id);

  const handleBookNow = () => {
    hapticFeedback.light();
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(`/book/${id}`);
  };

  const handleBack = () => {
    hapticFeedback.light();
    navigate(-1);
  };

  const handleLike = () => {
    hapticFeedback.light();
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    hapticFeedback.light();
    if (navigator.share) {
      navigator.share({
        title: skill?.title,
        text: skill?.description,
        url: window.location.href,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <LoadingSkeleton className="h-8 w-24 mb-4" />
          <LoadingSkeleton className="h-64 mb-6" />
          <LoadingSkeleton className="h-32" />
        </div>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">{t('detail.error_not_found')}</h1>
          <Button onClick={handleBack}>{t('detail.back')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50">
      <div className="max-w-2xl mx-auto px-4 py-6 mb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="p-2 hover:bg-white/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className="p-2 hover:bg-white/50"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="p-2 hover:bg-white/50"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Skill Image */}
        <div className="relative mb-6">
          <img
            src={skill.image_url || '/placeholder.svg'}
            alt={skill.title}
            className="w-full h-64 object-cover rounded-2xl shadow-lg"
          />
          {skill.is_top_rated && (
            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white">
              {t('badges.top_rated')}
            </Badge>
          )}
        </div>

        {/* Skill Info */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-6">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">{skill.title}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium">4.8</span>
                <span className="text-xs text-slate-600">(124 {t('reviews.reviews')})</span>
              </div>
              
              <div className="flex items-center gap-1 text-slate-600">
                <User className="w-4 h-4" />
                <span className="text-sm">{skill.profiles?.name || t('service_card.provider')}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{skill.duration}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{skill.location || 'Remote'}</span>
              </div>
            </div>

            <div className="text-2xl font-bold text-slate-800 mb-4">
              {skill.price} {t('currency.omr')}
            </div>

            <p className="text-slate-600 leading-relaxed">
              {skill.description}
            </p>
          </CardContent>
        </Card>

        {/* Expertise Tags */}
        {skill.expertise && skill.expertise.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">{t('expertise.title')}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.expertise.map((item, index) => (
                  <Badge key={index} variant="secondary" className="bg-soft-blue-100 text-soft-blue-700">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Use Cases */}
        {skill.use_cases && skill.use_cases.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">{t('use_cases.title')}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.use_cases.map((useCase, index) => (
                  <Badge key={index} variant="outline" className="border-mint-300 text-mint-700">
                    {useCase}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Book Now Section - Non-fixed, flows with content */}
        <div className="mt-8 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-lg font-semibold text-slate-800">{t('booking.ready_to_book')}</p>
                  <p className="text-sm text-slate-600">{t('booking.start_learning')}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-800">{skill.price} {t('currency.omr')}</p>
                  <p className="text-xs text-slate-600">{t('booking.per_session')}</p>
                </div>
              </div>
              
              <Button
                onClick={handleBookNow}
                className="w-full h-12 bg-gradient-to-r from-soft-blue-600 to-mint-600 hover:from-soft-blue-700 hover:to-mint-700 text-white font-semibold rounded-xl shadow-lg border-0"
              >
                {user ? t('actions.book_now') : t('actions.sign_in_to_book')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SkillDetail;
