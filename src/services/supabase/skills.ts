
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Skill = Database['public']['Tables']['skills']['Row'];
type SkillInsert = Database['public']['Tables']['skills']['Insert'];
type SkillUpdate = Database['public']['Tables']['skills']['Update'];

export const skillsService = {
  async getAll(filters?: {
    category?: string;
    search?: string;
    limit?: number;
  }) {
    let query = supabase
      .from('skills')
      .select(`
        *,
        profiles!provider_id(name, avatar),
        categories(title),
        subcategories(title),
        reviews(rating)
      `)
      .eq('is_active', true);

    if (filters?.category) {
      query = query.eq('categories.title', filters.category);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('skills')
      .select(`
        *,
        profiles!provider_id(name, avatar, bio, location),
        categories(title),
        subcategories(title),
        reviews(rating, comment, created_at, profiles!reviewer_id(name))
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getByProvider(userId: string) {
    const { data, error } = await supabase
      .from('skills')
      .select(`
        *,
        categories(title),
        reviews(rating)
      `)
      .eq('provider_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(skill: SkillInsert) {
    const { data, error } = await supabase
      .from('skills')
      .insert(skill)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: SkillUpdate) {
    const { data, error } = await supabase
      .from('skills')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getTopRated(limit = 6) {
    const { data, error } = await supabase
      .from('skills')
      .select(`
        *,
        profiles!provider_id(name, avatar),
        categories(title),
        reviews(rating)
      `)
      .eq('is_top_rated', true)
      .eq('is_active', true)
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
};
