
import React, { useState } from 'react';
import { Edit, Share, MoreVertical, Camera, MapPin, Phone, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';
import EditProfileModal from '../EditProfileModal';

interface MobileProfileHeaderProps {
  profile: UserProfile;
  onSignOut: () => void;
}

const MobileProfileHeader: React.FC<MobileProfileHeaderProps> = ({ profile, onSignOut }) => {
  const { t } = useTranslation('profile');
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name}'s Profile`,
          text: `Check out ${profile.name}'s skills and services`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Profile link has been copied to clipboard",
      });
    }
  };

  const handleCall = () => {
    if (profile.phone) {
      window.location.href = `tel:${profile.phone}`;
    }
  };

  const handleDirections = () => {
    if (profile.location) {
      const encodedLocation = encodeURIComponent(profile.location);
      window.open(`https://maps.google.com/?q=${encodedLocation}`, '_blank');
    }
  };

  return (
    <>
      <Card className="mb-4 border-0 shadow-xl bg-gradient-to-br from-soft-blue-50 via-white to-mint-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-soft-blue-100/20 to-mint-100/20"></div>
        
        <CardContent className="relative p-4">
          {/* Top Actions */}
          <div className="flex justify-between items-start mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
              className="text-slate-600 hover:text-soft-blue-700 hover:bg-white/50"
            >
              <Edit className="w-4 h-4 mr-1" />
              {t('header.edit_profile')}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/50">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleShare} className="cursor-pointer">
                  <Share className="w-4 h-4 mr-2" />
                  Share Profile
                </DropdownMenuItem>
                {profile.phone && (
                  <DropdownMenuItem onClick={handleCall} className="cursor-pointer">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </DropdownMenuItem>
                )}
                {profile.location && (
                  <DropdownMenuItem onClick={handleDirections} className="cursor-pointer">
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Profile Info */}
          <div className="text-center space-y-4">
            {/* Avatar with Camera Icon */}
            <div className="relative inline-block">
              <Avatar className="w-24 h-24 border-4 border-white shadow-xl mx-auto">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-soft-blue-400 to-mint-400 text-white font-bold">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-white shadow-md hover:scale-110 transition-transform"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Name and Status */}
            <div>
              <h1 className="text-xl font-bold text-slate-800 mb-1">
                {profile.name || 'Anonymous User'} 
                <span className="text-lg ml-2">✨</span>
              </h1>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                <div className="flex items-center gap-1 bg-soft-blue-50 rounded-full px-3 py-1">
                  <Calendar className="w-3 h-3" />
                  <span>{t('header.member_since')} {formatDate(profile.joinedDate)}</span>
                </div>
                {profile.location && (
                  <div className="flex items-center gap-1 bg-mint-50 rounded-full px-3 py-1">
                    <MapPin className="w-3 h-3" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="text-sm text-slate-700 leading-relaxed bg-white/50 p-3 rounded-lg border-l-4 border-soft-blue-300 text-left">
                {profile.bio}
              </p>
            )}

            {/* Badges */}
            {profile.badges && profile.badges.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-center">
                {profile.badges.slice(0, 3).map((badge, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 text-xs"
                  >
                    🏆 {badge}
                  </Badge>
                ))}
                {profile.badges.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{profile.badges.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={async (updates) => {
          console.log('Profile updates:', updates);
          return true;
        }}
        updating={false}
      />
    </>
  );
};

export default MobileProfileHeader;
