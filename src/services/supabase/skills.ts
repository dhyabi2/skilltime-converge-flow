
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Skill = Database['public']['Tables']['skills']['Row'];
type SkillInsert = Database['public']['Tables']['skills']['Insert'];
type SkillUpdate = Database['public']['Tables']['skills']['Update'];

export const skillsService = {
  async getAll(filters?: {
    category?: string;
    subcategory?: string;
    search?: string;
    limit?: number;
  }) {
    console.log('skillsService.getAll called with filters:', filters);
    
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

    if (filters?.subcategory) {
      query = query.eq('subcategories.title', filters.subcategory);
    }

    // Enhanced search with better handling for provider names
    if (filters?.search) {
      const searchTerm = `%${filters.search}%`;
      console.log('Applying search filter for:', searchTerm);
      
      // Use a more robust approach for searching across joined tables
      // First, let's search for skills by title and description
      query = query.or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }
    
    console.log('Raw skills data from Supabase:', data);
    
    // Transform data to match expected format
    let transformedSkills = (data || []).map(skill => ({
      id: skill.id,
      providerName: skill.profiles?.name || 'Unknown Provider',
      skillTitle: skill.title,
      rating: skill.reviews?.length > 0 
        ? skill.reviews.reduce((acc: number, review: any) => acc + (review.rating || 0), 0) / skill.reviews.length
        : 0,
      price: Number(skill.price),
      duration: skill.duration,
      location: skill.location || 'Remote',
      image: skill.image_url || '/placeholder.svg',
      isTopRated: skill.is_top_rated || false,
      category: skill.categories?.title || 'Uncategorized',
      subcategory: skill.subcategories?.title || 'general',
      description: skill.description || '',
      expertise: skill.expertise || [],
      publishedDate: skill.published_date,
      weeklyExchanges: skill.weekly_exchanges || 0,
      useCases: skill.use_cases || [],
      providerImage: skill.profiles?.avatar || '/placeholder.svg'
    }));

    // Apply additional client-side filtering for provider name search
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase().trim();
      console.log('Applying client-side provider name filter for:', searchLower);
      
      transformedSkills = transformedSkills.filter(skill => {
        const providerName = (skill.providerName || '').toLowerCase();
        const skillTitle = (skill.skillTitle || '').toLowerCase();
        const description = (skill.description || '').toLowerCase();
        const category = (skill.category || '').toLowerCase();
        
        const matchesProvider = providerName.includes(searchLower);
        const matchesTitle = skillTitle.includes(searchLower);
        const matchesDescription = description.includes(searchLower);
        const matchesCategory = category.includes(searchLower);
        
        console.log(`Skill "${skill.skillTitle}" by "${skill.providerName}":`, {
          matchesProvider,
          matchesTitle,
          matchesDescription,
          matchesCategory,
          providerName,
          searchLower
        });
        
        return matchesProvider || matchesTitle || matchesDescription || matchesCategory;
      });
    }
    
    console.log('Final transformed skills after filtering:', transformedSkills);
    return transformedSkills;
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
        subcategories(title),
        reviews(rating)
      `)
      .eq('provider_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Transform data to match expected format
    return (data || []).map(skill => ({
      id: skill.id,
      providerName: 'You', // Since it's the user's own skills
      skillTitle: skill.title,
      rating: skill.reviews?.length > 0 
        ? skill.reviews.reduce((acc: number, review: any) => acc + (review.rating || 0), 0) / skill.reviews.length
        : 0,
      price: Number(skill.price),
      duration: skill.duration,
      location: skill.location || 'Remote',
      image: skill.image_url || '/placeholder.svg',
      isTopRated: skill.is_top_rated || false,
      category: skill.categories?.title || 'Uncategorized',
      description: skill.description || ''
    }));
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
