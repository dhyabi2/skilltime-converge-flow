
import React, { useState } from 'react';
import { Star, Calendar, Award, Heart, TrendingUp, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UserProfile } from '@/hooks/useProfile';
import StatsDetailModal from './modals/StatsDetailModal';
import BadgeDetailModal from './modals/BadgeDetailModal';

interface ProfileOverviewProps {
  profile: UserProfile;
  mySkills: any[];
  skillsLoading: boolean;
  onRemoveSkill: (index: number) => void;
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ 
  profile, 
  mySkills, 
  skillsLoading,
  onRemoveSkill 
}) => {
  const { t } = useTranslation('profile');
  const [selectedModal, setSelectedModal] = useState<{
    type: 'skills' | 'bookings' | 'reviews' | 'rating' | 'badges' | null;
    data?: any;
  }>({ type: null });

  const calculateProfileCompletion = () => {
    let completed = 0;
    const total = 6;
    
    if (profile.name) completed++;
    if (profile.email) completed++;
    if (profile.bio) completed++;
    if (profile.location) completed++;
    if (profile.phone) completed++;
    if (profile.avatar) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const stats = [
    {
      label: t('overview.stats.skills'),
      value: profile.skills.length + mySkills.length,
      icon: Zap,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      type: 'skills' as const
    },
    {
      label: t('overview.stats.bookings'),
      value: profile.completedBookings,
      icon: Calendar,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      type: 'bookings' as const
    },
    {
      label: t('overview.stats.reviews'),
      value: 0,
      icon: Star,
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50',
      type: 'reviews' as const
    },
    {
      label: t('overview.stats.rating'),
      value: profile.rating.toFixed(1),
      icon: Award,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      type: 'rating' as const
    }
  ];

  const profileCompletion = calculateProfileCompletion();

  const handleStatsClick = (type: 'skills' | 'bookings' | 'reviews' | 'rating', data?: any) => {
    setSelectedModal({ type, data });
  };

  const handleBadgesClick = () => {
    setSelectedModal({ type: 'badges' });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Header */}
      <div className="text-center py-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
          <span className="text-2xl animate-bounce">🌟</span>
          {t('overview.title')}
        </h2>
        <p className="text-slate-600 text-sm">{t('overview.subtitle')}</p>
      </div>

      {/* Stats Grid - Now Clickable */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card 
              key={stat.label} 
              className={`${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleStatsClick(stat.type, stat.type === 'skills' ? mySkills : null)}
            >
              <CardContent className="p-3 sm:p-4 text-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:rotate-12 transition-transform duration-300`}>
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 mb-1">
                  {typeof stat.value === 'number' && stat.value === 0 ? '🎯' : stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Profile Completion */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50 hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            {t('overview.profile_completion')} ✨
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                {profileCompletion}% {profileCompletion === 100 ? '🎉' : '📈'}
              </span>
              <span className="text-xs text-slate-500">
                {profileCompletion < 100 ? `${100 - profileCompletion}% to go!` : 'Perfect! 🌟'}
              </span>
            </div>
            <Progress 
              value={profileCompletion} 
              className="h-2 sm:h-3 bg-white/50" 
            />
            {profileCompletion < 100 && (
              <p className="text-xs sm:text-sm text-slate-600 bg-white/50 p-2 sm:p-3 rounded-lg">
                💡 Complete your profile to unlock more features and attract more opportunities!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Badges Section - Now Clickable */}
      <Card 
        className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all duration-300 cursor-pointer"
        onClick={handleBadgesClick}
      >
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            {t('overview.badges_title')} 🏆
          </CardTitle>
          <p className="text-xs sm:text-sm text-slate-600">{t('overview.badges_subtitle')}</p>
        </CardHeader>
        <CardContent>
          {profile.badges && profile.badges.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.badges.map((badge, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 hover:from-amber-200 hover:to-orange-200 transition-all duration-200 hover:scale-110 cursor-default text-xs sm:text-sm py-1.5 px-3"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  🏅 {badge}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 animate-pulse">🎯</div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">{t('overview.no_badges')}</h3>
              <div className="bg-white/50 rounded-lg p-3 sm:p-4 border-2 border-dashed border-amber-200">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mx-auto mb-2" />
                <p className="text-xs sm:text-sm text-slate-600">Start completing tasks and offering skills to earn your first badge! 🌟</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modals */}
      {selectedModal.type && selectedModal.type !== 'badges' && (
        <StatsDetailModal
          isOpen={true}
          onClose={() => setSelectedModal({ type: null })}
          type={selectedModal.type}
          data={selectedModal.data}
          profile={profile}
        />
      )}

      {selectedModal.type === 'badges' && (
        <BadgeDetailModal
          isOpen={true}
          onClose={() => setSelectedModal({ type: null })}
          badges={profile.badges || []}
        />
      )}
    </div>
  );
};

export default ProfileOverview;
