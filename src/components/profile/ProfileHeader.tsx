
import React from 'react';
import { Camera, MapPin, Calendar, Star, Edit, LogOut } from 'lucide-react';
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
    <div className="bg-gradient-to-r from-soft-blue-400 via-soft-blue-300 to-mint-400 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white mb-4 sm:mb-6">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-3 sm:mb-4">
          <Avatar className="h-16 w-16 sm:h-24 sm:w-24 border-4 border-white/20">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="bg-white/20 text-white text-lg sm:text-2xl font-bold">
              {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
            </AvatarFallback>
          </Avatar>
          {onEditClick && (
            <button 
              onClick={onEditClick}
              className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 border border-white/30 hover:bg-white/30 transition-colors"
            >
              <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
        
        <h1 className="text-lg sm:text-2xl font-bold mb-2">
          {displayName}
          {!profile.name && (
            <span className="text-white/60 text-xs sm:text-sm font-normal ml-2 block sm:inline">
              (Click edit to add)
            </span>
          )}
        </h1>
        
        <p className="text-white/80 mb-3 sm:mb-4 max-w-sm text-sm sm:text-base px-2">
          {displayBio}
          {!profile.bio && (
            <span className="text-white/50"> Click edit to add your bio.</span>
          )}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1 justify-center">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{displayLocation}</span>
          </div>
          <div className="flex items-center gap-1 justify-center">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Joined {new Date(profile.joinedDate).toLocaleDateString()}</span>
          </div>
          {profile.rating > 0 && (
            <div className="flex items-center gap-1 justify-center">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
              <span>{profile.rating}/5</span>
            </div>
          )}
        </div>
        
        {profile.badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-3 sm:mb-4">
            {profile.badges.map((badge, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-white/20 text-white border-white/30 text-xs px-2 py-1"
              >
                {badge}
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
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs sm:text-sm"
            >
              <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Edit Profile
            </Button>
          )}
          {onSignOut && (
            <Button 
              onClick={onSignOut}
              variant="secondary" 
              size="sm"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs sm:text-sm"
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
