
import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Calendar, User, Shield, Award } from 'lucide-react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useSkillDetails, useSkillReviews, useSkillReviewStats } from '@/hooks/useSkillDetails';
import { useAuth } from '@/contexts/AuthContext';
import UseCases from '../components/discovery/UseCases';

const SkillDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation('skills');
  const { t: tCommon } = useTranslation('common');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { data: skill, isLoading, error } = useSkillDetails(id);
  const { data: reviews = [] } = useSkillReviews(id);
  const { data: reviewStats } = useSkillReviewStats(id);

  useEffect(() => {
    if (headerRef.current && !isLoading) {
      gsap.fromTo(headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }

    if (contentRef.current && !isLoading) {
      gsap.fromTo(contentRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.3
        }
      );
    }
  }, [isLoading]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (selectedTimeSlot) {
      navigate(`/book/${skill.id}?slot=${selectedTimeSlot}`);
    } else {
      navigate(`/book/${skill.id}`);
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">{tCommon('labels.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">{t('status.skill_not_found')}</h1>
          <Button onClick={handleBack}>{tCommon('buttons.back')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobile Optimized */}
      <div
        ref={headerRef}
        className="relative h-48 sm:h-64 bg-gradient-to-br from-purple-600 to-blue-600"
      >
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 rtl:left-auto rtl:right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white z-10"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        
        <img
          src={skill.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'}
          alt={skill.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">{skill.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <div className="flex items-center">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 rtl:mr-0 rtl:ml-1" />
              <span>{skill.duration}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 rtl:mr-0 rtl:ml-1" />
              <span>{skill.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Mobile Optimized */}
      <div ref={contentRef} className="px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-24">
        {/* Provider Info */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start space-x-3 sm:space-x-4 rtl:space-x-reverse mb-4">
              <img
                src={skill.profiles?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'}
                alt={skill.profiles?.name}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                      <h3 className="font-bold text-base sm:text-lg text-gray-800 truncate">{skill.profiles?.name}</h3>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200 text-xs flex-shrink-0">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    {reviewStats && (
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          {renderStars(Math.round(reviewStats.averageRating))}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600">
                          ({reviewStats.totalReviews} {tCommon('labels.reviews')})
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-left sm:text-right rtl:text-left flex-shrink-0">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">{skill.price} ر.ع</div>
                    <div className="text-xs sm:text-sm text-gray-500">{t('details.per_session')}</div>
                  </div>
                </div>
              </div>
            </div>

            {skill.profiles?.bio && (
              <div className="mt-4 p-3 sm:p-4 bg-purple-50 rounded-lg border-l-4 border-purple-300">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-sm sm:text-base">
                  <User className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2 text-purple-600" />
                  {t('details.about_provider')}
                </h4>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{skill.profiles.bio}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skill Description */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-3">{t('details.about')}</h3>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">{skill.description}</p>
            
            {skill.expertise && skill.expertise.length > 0 && (
              <>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">{t('details.expertise')}</h4>
                <div className="flex flex-wrap gap-2">
                  {skill.expertise.map((item, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Use Cases */}
        {skill.use_cases && skill.use_cases.length > 0 && (
          <UseCases useCases={skill.use_cases} />
        )}

        {/* Reviews Section - Mobile Optimized */}
        {reviews.length > 0 && (
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <h3 className="font-bold text-base sm:text-lg text-gray-800 flex items-center">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-500" />
                  {t('details.reviews')}
                </h3>
                {reviewStats && (
                  <div className="text-left sm:text-right">
                    <div className="text-xl sm:text-2xl font-bold text-yellow-600">
                      {reviewStats.averageRating.toFixed(1)}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {reviewStats.totalReviews} {tCommon('labels.reviews')}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 sm:space-y-4">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-3 sm:pb-4 last:border-b-0">
                    <div className="flex items-start space-x-3">
                      <img
                        src={review.profiles?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'}
                        alt={review.profiles?.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <h5 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                            {review.profiles?.name || 'Anonymous'}
                          </h5>
                          <div className="flex">
                            {renderStars(review.rating || 0)}
                          </div>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{review.comment}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Fixed Book Now Button - Mobile Optimized */}
      <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200">
        <Button
          onClick={handleBookNow}
          className="w-full py-3 sm:py-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl sm:rounded-2xl shadow-lg"
        >
          {user ? tCommon('buttons.book_now') : tCommon('buttons.sign_in_to_book')}
        </Button>
      </div>
    </div>
  );
};

export default SkillDetail;
