
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profilesService } from '@/services/supabase/profiles';
import { fileUploadService } from '@/services/supabase/fileUpload';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface ProfileUpdateData {
  name?: string;
  email?: string;
  bio?: string;
  location?: string;
  phone?: string;
  avatar?: string;
}

export const useProfileUpdate = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: ProfileUpdateData) => 
      profilesService.updateProfile(user!.id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      queryClient.invalidateQueries({ queryKey: ['user-statistics'] });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });
};

export const useAvatarUpdate = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const avatarUrl = await fileUploadService.uploadAvatar(file, user!.id);
      await profilesService.updateProfile(user!.id, { avatar: avatarUrl });
      return avatarUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      toast({
        title: "Success",
        description: "Avatar updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update avatar",
        variant: "destructive",
      });
    },
  });
};

export const useProfileShare = () => {
  const { toast } = useToast();

  const shareProfile = async (profileName: string) => {
    const profileUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profileName}'s Profile`,
          text: `Check out ${profileName}'s skills and services`,
          url: profileUrl,
        });
        return true;
      } catch (error) {
        console.log('Share cancelled');
        return false;
      }
    } else {
      await navigator.clipboard.writeText(profileUrl);
      toast({
        title: "Link copied!",
        description: "Profile link has been copied to clipboard",
      });
      return true;
    }
  };

  return { shareProfile };
};
