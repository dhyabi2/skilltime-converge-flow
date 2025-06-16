
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  phone: string;
  joinedDate: string;
  completedBookings: number;
  rating: number;
  skills: string[];
  badges: string[];
}

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
      
      // Fetch profile data - use maybeSingle() instead of single() to handle missing profiles
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
        return;
      }

      // If no profile exists, create one
      if (!profileData) {
        console.log('No profile found, creating one...');
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            name: user.user_metadata?.full_name || user.user_metadata?.name || '',
            email: user.email || '',
            avatar: user.user_metadata?.avatar_url || '',
            bio: '',
            location: '',
            phone: ''
          })
          .select()
          .single();

        if (createError) {
          console.error('Profile creation error:', createError);
          toast({
            title: "Error",
            description: "Failed to create profile",
            variant: "destructive",
          });
          return;
        }

        // Use the newly created profile
        setProfile({
          id: newProfile.id,
          name: newProfile.name || '',
          email: newProfile.email || '',
          avatar: newProfile.avatar || '',
          bio: newProfile.bio || '',
          location: newProfile.location || '',
          phone: newProfile.phone || '',
          joinedDate: newProfile.created_at,
          completedBookings: 0,
          rating: 0,
          skills: [],
          badges: []
        });
        return;
      }

      // Fetch skills
      const { data: skillsData, error: skillsError } = await supabase
        .from('user_skills')
        .select('skill')
        .eq('user_id', user.id);

      if (skillsError) {
        console.error('Skills fetch error:', skillsError);
      }

      // Fetch badges
      const { data: badgesData, error: badgesError } = await supabase
        .from('user_badges')
        .select('badge')
        .eq('user_id', user.id);

      if (badgesError) {
        console.error('Badges fetch error:', badgesError);
      }

      const skills = skillsData?.map(item => item.skill) || [];
      const badges = badgesData?.map(item => item.badge) || [];

      setProfile({
        id: profileData.id,
        name: profileData.name || '',
        email: profileData.email || '',
        avatar: profileData.avatar || '',
        bio: profileData.bio || '',
        location: profileData.location || '',
        phone: profileData.phone || '',
        joinedDate: profileData.created_at,
        completedBookings: 0, // This would come from a bookings table
        rating: 0, // This would come from a reviews/ratings table
        skills,
        badges
      });
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
      
      const { error } = await supabase
        .from('profiles')
        .update({
          name: updates.name,
          email: updates.email,
          avatar: updates.avatar,
          bio: updates.bio,
          location: updates.location,
          phone: updates.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Update profile error:', error);
        toast({
          title: "Error",
          description: "Failed to update profile",
          variant: "destructive",
        });
        return false;
      }

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
      const { error } = await supabase
        .from('user_skills')
        .insert({
          user_id: user.id,
          skill: skill
        });

      if (error) {
        console.error('Add skill error:', error);
        toast({
          title: "Error",
          description: "Failed to add skill",
          variant: "destructive",
        });
        return false;
      }

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
      
      const { error } = await supabase
        .from('user_skills')
        .delete()
        .eq('user_id', user.id)
        .eq('skill', skillToRemove);

      if (error) {
        console.error('Remove skill error:', error);
        toast({
          title: "Error",
          description: "Failed to remove skill",
          variant: "destructive",
        });
        return false;
      }

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
