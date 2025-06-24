
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/types/profile';
import { profileService } from '@/services/profileService';
import { createProfileFromData, createProfileFromNewUser } from '@/utils/profileUtils';

export const useProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Fetch profile data
      const profileData = await profileService.fetchProfileData(user.id);

      // If no profile exists, create one
      if (!profileData) {
        console.log('No profile found, creating one...');
        const newProfile = await profileService.createProfile(
          user.id,
          user.user_metadata,
          user.email || ''
        );

        setProfile(createProfileFromNewUser(newProfile));
        return;
      }

      // Fetch skills and badges
      const [skills, badges] = await Promise.all([
        profileService.fetchUserSkills(user.id),
        profileService.fetchUserBadges(user.id)
      ]);

      setProfile(createProfileFromData(profileData, skills, badges));
    } catch (error: any) {
      console.error('Fetch profile error:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) return false;

    try {
      setUpdating(true);
      
      await profileService.updateProfile(user.id, updates);

      setProfile({ ...profile, ...updates });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      return true;
    } catch (error: any) {
      console.error('Update profile error:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      return false;
    } finally {
      setUpdating(false);
    }
  };

  const addSkill = async (skill: string) => {
    if (!user || !profile) return false;

    try {
      await profileService.addSkill(user.id, skill);

      const updatedSkills = [...profile.skills, skill];
      setProfile({ ...profile, skills: updatedSkills });
      toast({
        title: "Success",
        description: "Skill added successfully",
      });
      return true;
    } catch (error: any) {
      console.error('Add skill error:', error);
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      });
      return false;
    }
  };

  const removeSkill = async (skillIndex: number) => {
    if (!user || !profile) return false;

    try {
      const skillToRemove = profile.skills[skillIndex];
      
      await profileService.removeSkill(user.id, skillToRemove);

      const updatedSkills = profile.skills.filter((_, index) => index !== skillIndex);
      setProfile({ ...profile, skills: updatedSkills });
      toast({
        title: "Success",
        description: "Skill removed successfully",
      });
      return true;
    } catch (error: any) {
      console.error('Remove skill error:', error);
      toast({
        title: "Error",
        description: "Failed to remove skill",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    profile,
    loading,
    updating,
    updateProfile,
    addSkill,
    removeSkill,
    refetch: fetchProfile
  };
};
