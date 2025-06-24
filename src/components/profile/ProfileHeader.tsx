
import React, { useState } from 'react';
import { LogOut, Edit, Calendar, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from '@/hooks/useProfile';
import EditProfileModal from './EditProfileModal';

interface ProfileHeaderProps {
  profile: UserProfile;
  onSignOut: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, onSignOut }) => {
  const { t } = useTranslation('profile');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <>
      <Card className="mb-4 sm:mb-6 border-0 shadow-xl bg-gradient-to-r from-soft-blue-50 via-white to-mint-50 hover:shadow-2xl transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-soft-blue-100/20 to-mint-100/20 animate-pulse"></div>
        <CardContent className="relative p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Avatar */}
            <div className="relative group">
              <Avatar className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 border-4 border-white shadow-xl group-hover:scale-110 transition-all duration-300">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-xl sm:text-2xl lg:text-3xl bg-gradient-to-br from-soft-blue-400 to-mint-400 text-white font-bold">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-green-400 rounded-full border-2 sm:border-4 border-white flex items-center justify-center animate-bounce">
                <span className="text-xs sm:text-sm">✨</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left space-y-2 sm:space-y-3">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-1 sm:mb-2 hover:text-soft-blue-600 transition-colors duration-200">
                  {profile.name || 'Anonymous User'} 
                  <span className="text-lg sm:text-xl ml-2 animate-bounce">👋</span>
                </h1>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-1 bg-soft-blue-50 rounded-full px-2 sm:px-3 py-1 hover:bg-soft-blue-100 transition-colors duration-200">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{t('header.member_since')} {formatDate(profile.joinedDate)}</span>
                  </div>
                  {profile.location && (
                    <div className="flex items-center gap-1 bg-mint-50 rounded-full px-2 sm:px-3 py-1 hover:bg-mint-100 transition-colors duration-200">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>📍 {profile.location}</span>
                    </div>
                  )}
                  {profile.phone && (
                    <div className="flex items-center gap-1 bg-purple-50 rounded-full px-2 sm:px-3 py-1 hover:bg-purple-100 transition-colors duration-200">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>📞 {profile.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {profile.bio && (
                <p className="text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed bg-white/50 p-2 sm:p-3 rounded-lg border-l-4 border-soft-blue-300 hover:bg-white/70 transition-all duration-200">
                  💭 {profile.bio}
                </p>
              )}

              {/* Badges */}
              {profile.badges && profile.badges.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-2 justify-center sm:justify-start">
                  {profile.badges.map((badge, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 hover:from-yellow-200 hover:to-orange-200 transition-all duration-200 hover:scale-110 cursor-default text-xs"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      🏆 {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                onClick={() => setIsEditModalOpen(true)}
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm hover:bg-soft-blue-50 hover:border-soft-blue-300 hover:text-soft-blue-700 transition-all duration-200 hover:scale-105"
              >
                <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                {t('header.edit_profile')}
              </Button>
              <Button
                onClick={onSignOut}
                variant="ghost"
                size="sm"
                className="text-xs sm:text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 hover:scale-105"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                {t('header.sign_out')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={async (updates) => {
          // This would be handled by the parent component
          console.log('Profile updates:', updates);
          return true;
        }}
        updating={false}
      />
    </>
  );
};

export default ProfileHeader;
