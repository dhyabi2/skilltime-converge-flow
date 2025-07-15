
import { supabase } from '@/integrations/supabase/client';

export const fileUploadService = {
  async uploadAvatar(file: File, userId: string): Promise<string> {
    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Avatar upload error:', error);
      throw error;
    }
  },

  async uploadSkillImage(file: File, skillId: string): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${skillId}-${Date.now()}.${fileExt}`;
      const filePath = `skills/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('skill-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('skill-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Skill image upload error:', error);
      throw error;
    }
  },

  async deleteFile(bucket: string, path: string): Promise<void> {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  }
};
