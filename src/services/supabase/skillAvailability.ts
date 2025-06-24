
import { supabase } from '@/integrations/supabase/client';

export interface SkillAvailability {
  id?: string;
  skill_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available?: boolean;
}

export const skillAvailabilityService = {
  async create(availability: Omit<SkillAvailability, 'id'>) {
    const { data, error } = await supabase
      .from('skill_availability')
      .insert(availability)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async createMultiple(availabilities: Omit<SkillAvailability, 'id'>[]) {
    const { data, error } = await supabase
      .from('skill_availability')
      .insert(availabilities)
      .select();

    if (error) throw error;
    return data;
  },

  async getBySkillId(skillId: string) {
    const { data, error } = await supabase
      .from('skill_availability')
      .select('*')
      .eq('skill_id', skillId)
      .order('day_of_week')
      .order('start_time');

    if (error) throw error;
    return data || [];
  },

  async updateBySkillId(skillId: string, availabilities: Omit<SkillAvailability, 'id'>[]) {
    // Delete existing availability for this skill
    const { error: deleteError } = await supabase
      .from('skill_availability')
      .delete()
      .eq('skill_id', skillId);

    if (deleteError) throw deleteError;

    // Insert new availability slots
    if (availabilities.length > 0) {
      const { data, error } = await supabase
        .from('skill_availability')
        .insert(availabilities)
        .select();

      if (error) throw error;
      return data;
    }

    return [];
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('skill_availability')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
