
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usersAPI } from '@/services/modules/users';
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
      const profileData = await usersAPI.getProfile(user.id);
      setProfile(profileData);
    } catch (error: any) {
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
    if (!user || !profile) return;

    try {
      setUpdating(true);
      const result = await usersAPI.updateProfile(user.id, updates);
      
      if (result.success) {
        setProfile({ ...profile, ...updates });
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
        return true;
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
    return false;
  };

  return {
    profile,
    loading,
    updating,
    updateProfile,
    refetch: fetchProfile
  };
};
