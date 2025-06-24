
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Category = Database['public']['Tables']['categories']['Row'];
type Subcategory = Database['public']['Tables']['subcategories']['Row'];

export const categoriesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('title');

    if (error) throw error;
    return data || [];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getSubcategories(categoryId: string) {
    const { data, error } = await supabase
      .from('subcategories')
      .select('*')
      .eq('category_id', categoryId)
      .order('title');

    if (error) throw error;
    return data || [];
  },

  async updateSkillCount(categoryId: string) {
    // Get current skill count for this category
    const { data: skills, error: skillsError } = await supabase
      .from('skills')
      .select('id')
      .eq('category_id', categoryId)
      .eq('is_active', true);

    if (skillsError) throw skillsError;

    // Update the category with the current count
    const { error } = await supabase
      .from('categories')
      .update({ skill_count: skills?.length || 0 })
      .eq('id', categoryId);

    if (error) throw error;
  }
};
