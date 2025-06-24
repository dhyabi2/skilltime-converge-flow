
import React from 'react';
import { Camera, MapPin, Calendar, Star, Edit, LogOut, Sparkles, Trophy } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserProfile } from '@/hooks/useProfile';

interface ProfileHeaderProps {
  profile: UserProfile;
  onEditClick?: () => void;
  onSignOut?: () => Promise<void>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, onEditClick, onSignOut }) => {
  const displayName = profile.name || 'Add your name';
  const displayBio = profile.bio || 'Tell us about yourself...';
  const displayLocation = profile.location || 'Add your location';
  
  return (
    <div className="relative bg-gradient-to-br from-soft-blue-400 via-soft-blue-300 to-mint-400 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white mb-4 sm:mb-6 overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-4 right-4 opacity-20">
        <Sparkles className="w-6 h-6 animate-pulse" />
      </div>
      <div className="absolute bottom-4 left-4 opacity-10">
        <Trophy className="w-8 h-8 animate-bounce" style={{ animationDelay: '0.5s' }} />
      </div>
      
      <div className="flex flex-col items-center text-center relative z-10">
        <div className="relative mb-3 sm:mb-4 group">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
          <Avatar className="h-16 w-16 sm:h-24 sm:w-24 border-4 border-white/30 relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:border-white/50">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="bg-gradient-to-br from-white/30 to-white/10 text-white text-lg sm:text-2xl font-bold animate-pulse">
              {profile.name ? profile.name.charAt(0).toUpperCase() : '🙋'}
            </AvatarFallback>
          </Avatar>
          {onEditClick && (
            <button 
              onClick={onEditClick}
              className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-white/30 backdrop-blur-sm rounded-full p-1.5 sm:p-2 border border-white/40 hover:bg-white/40 hover:scale-110 transition-all duration-200 hover:rotate-12"
            >
              <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
        
        <div className="mb-3 sm:mb-4">
          <h1 className="text-lg sm:text-2xl font-bold mb-2 hover:scale-105 transition-transform duration-200 cursor-default">
            {displayName}
            {!profile.name && (
              <span className="text-white/60 text-xs sm:text-sm font-normal ml-2 block sm:inline animate-pulse">
                ✨ (Click edit to add)
              </span>
            )}
          </h1>
          
          <p className="text-white/90 mb-2 max-w-sm text-sm sm:text-base px-2 hover:text-white transition-colors duration-200">
            {displayBio}
            {!profile.bio && (
              <span className="text-white/60"> 💭 Click edit to add your story!</span>
            )}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1 justify-center bg-white/10 rounded-full px-3 py-1 hover:bg-white/20 transition-all duration-200 hover:scale-105">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{displayLocation}</span>
          </div>
          <div className="flex items-center gap-1 justify-center bg-white/10 rounded-full px-3 py-1 hover:bg-white/20 transition-all duration-200 hover:scale-105">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>🎉 Joined {new Date(profile.joinedDate).toLocaleDateString()}</span>
          </div>
          {profile.rating > 0 && (
            <div className="flex items-center gap-1 justify-center bg-yellow-400/20 rounded-full px-3 py-1 hover:bg-yellow-400/30 transition-all duration-200 hover:scale-105">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-300 text-yellow-300 animate-pulse" />
              <span className="font-semibold">{profile.rating}/5 ⭐</span>
            </div>
          )}
        </div>
        
        {profile.badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-3 sm:mb-4">
            {profile.badges.map((badge, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-white/20 text-white border-white/30 text-xs px-3 py-1 hover:bg-white/30 hover:scale-110 transition-all duration-200 cursor-default"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                🏆 {badge}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-2">
          {onEditClick && (
            <Button 
              onClick={onEditClick}
              variant="secondary" 
              size="sm"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:scale-105 text-xs sm:text-sm transition-all duration-200 hover:shadow-lg"
            >
              <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              ✨ Edit Profile
            </Button>
          )}
          {onSignOut && (
            <Button 
              onClick={onSignOut}
              variant="secondary" 
              size="sm"
              className="bg-white/20 text-white border-white/30 hover:bg-red-200/30 hover:scale-105 text-xs sm:text-sm transition-all duration-200 hover:shadow-lg"
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              👋 Sign Out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
