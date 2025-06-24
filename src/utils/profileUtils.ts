
import { UserProfile } from '@/types/profile';

export const createProfileFromData = (
  profileData: any,
  skills: string[],
  badges: string[]
): UserProfile => {
  const typedProfileData = profileData as any;
  return {
    id: typedProfileData.id,
    name: typedProfileData.name || '',
    email: typedProfileData.email || '',
    avatar: typedProfileData.avatar || '',
    bio: typedProfileData.bio || '',
    location: typedProfileData.location || '',
    phone: typedProfileData.phone || '',
    joinedDate: typedProfileData.created_at,
    completedBookings: 0,
    rating: 0,
    skills,
    badges
  };
};

export const createProfileFromNewUser = (
  newProfileData: any,
  skills: string[] = [],
  badges: string[] = []
): UserProfile => {
  const typedProfile = newProfileData as any;
  return {
    id: typedProfile.id,
    name: typedProfile.name || '',
    email: typedProfile.email || '',
    avatar: typedProfile.avatar || '',
    bio: typedProfile.bio || '',
    location: typedProfile.location || '',
    phone: typedProfile.phone || '',
    joinedDate: typedProfile.created_at,
    completedBookings: 0,
    rating: 0,
    skills,
    badges
  };
};
