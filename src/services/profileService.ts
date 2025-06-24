
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/profile';

export const profileService = {
  async fetchProfileData(userId: string) {
    const { data: profileData, error: profileError } = await supabase
      .from('skillstime_profiles' as any)
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (profileError) {
      throw new Error(`Profile fetch error: ${profileError.message}`);
    }

    return profileData;
  },

  async createProfile(userId: string, userMetadata: any, email: string) {
    const { data: newProfile, error: createError } = await supabase
      .from('skillstime_profiles' as any)
      .insert({
        id: userId,
        name: userMetadata?.full_name || userMetadata?.name || '',
        email: email || '',
        avatar: userMetadata?.avatar_url || '',
        bio: '',
        location: '',
        phone: ''
      })
      .select()
      .single();

    if (createError) {
      throw new Error(`Profile creation error: ${createError.message}`);
    }

    return newProfile;
  },

  async fetchUserSkills(userId: string) {
    const { data: skillsData, error: skillsError } = await supabase
      .from('skillstime_user_skills' as any)
      .select('skill')
      .eq('user_id', userId);

    if (skillsError) {
      console.error('Skills fetch error:', skillsError);
    }

    return skillsData?.map((item: any) => item.skill) || [];
  },

  async fetchUserBadges(userId: string) {
    const { data: badgesData, error: badgesError } = await supabase
      .from('skillstime_user_badges' as any)
      .select('badge')
      .eq('user_id', userId);

    if (badgesError) {
      console.error('Badges fetch error:', badgesError);
    }

    return badgesData?.map((item: any) => item.badge) || [];
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const { error } = await supabase
      .from('skillstime_profiles' as any)
      .update({
        name: updates.name,
        email: updates.email,
        avatar: updates.avatar,
        bio: updates.bio,
        location: updates.location,
        phone: updates.phone,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) {
      throw new Error(`Update profile error: ${error.message}`);
    }
  },

  async addSkill(userId: string, skill: string) {
    const { error } = await supabase
      .from('skillstime_user_skills' as any)
      .insert({
        user_id: userId,
        skill: skill
      });

    if (error) {
      throw new Error(`Add skill error: ${error.message}`);
    }
  },

  async removeSkill(userId: string, skill: string) {
    const { error } = await supabase
      .from('skillstime_user_skills' as any)
      .delete()
      .eq('user_id', userId)
      .eq('skill', skill);

    if (error) {
      throw new Error(`Remove skill error: ${error.message}`);
    }
  }
};
