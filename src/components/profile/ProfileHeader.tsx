
import React from 'react';
import { Camera, MapPin, Calendar, Star, Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserProfile } from '@/hooks/useProfile';

interface ProfileHeaderProps {
  profile: UserProfile;
  onEditClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, onEditClick }) => {
  const displayName = profile.name || 'Add your name';
  const displayBio = profile.bio || 'Tell us about yourself...';
  const displayLocation = profile.location || 'Add your location';
  
  return (
    <div className="bg-gradient-to-r from-soft-blue-400 via-soft-blue-300 to-mint-400 rounded-3xl p-6 text-white mb-6">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <Avatar className="h-24 w-24 border-4 border-white/20">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
              {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
            </AvatarFallback>
          </Avatar>
          <button 
            onClick={onEditClick}
            className="absolute -bottom-2 -right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30 hover:bg-white/30 transition-colors"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">
          {displayName}
          {!profile.name && (
            <span className="text-white/60 text-sm font-normal ml-2">(Click edit to add)</span>
          )}
        </h1>
        
        <p className="text-white/80 mb-4 max-w-sm">
          {displayBio}
          {!profile.bio && (
            <span className="text-white/50"> Click edit to add your bio.</span>
          )}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{displayLocation}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Joined {new Date(profile.joinedDate).toLocaleDateString()}</span>
          </div>
          {profile.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" />
              <span>{profile.rating}/5</span>
            </div>
          )}
        </div>
        
        {profile.badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {profile.badges.map((badge, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-white/20 text-white border-white/30"
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}
        
        <Button 
          onClick={onEditClick}
          variant="secondary" 
          className="bg-white/20 text-white border-white/30 hover:bg-white/30"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
