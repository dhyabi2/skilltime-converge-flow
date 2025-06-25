
// Skills API module - Updated to use real Supabase data
import { skillsService } from '../supabase/skills';

export const skillsAPI = {
  getAll: async (filters = {}) => {
    try {
      console.log('skillsAPI.getAll called with filters:', filters);
      
      // Use the real Supabase skills service
      const skills = await skillsService.getAll({
        category: filters.category,
        subcategory: filters.subcategory,
        search: filters.search,
        limit: filters.limit
      });
      
      console.log('Skills fetched from Supabase:', skills);
      
      // Apply additional client-side filtering if needed
      let filteredSkills = skills;
      
      if (filters.maxPrice) {
        filteredSkills = filteredSkills.filter(skill => 
          Number(skill.price) <= filters.maxPrice
        );
      }
      
      console.log('Final filtered skills:', filteredSkills);
      return filteredSkills;
    } catch (error) {
      console.error('Error in skillsAPI.getAll:', error);
      // Return empty array on error to prevent crashes
      return [];
    }
  },

  getById: async (id) => {
    try {
      const skill = await skillsService.getById(id);
      return skill;
    } catch (error) {
      console.error('Error fetching skill by ID:', error);
      throw error;
    }
  },

  getByProvider: async (userId) => {
    try {
      const skills = await skillsService.getByProvider(userId);
      return skills;
    } catch (error) {
      console.error('Error fetching skills by provider:', error);
      return [];
    }
  },

  getTopRated: async (limit = 6) => {
    try {
      const skills = await skillsService.getTopRated(limit);
      return skills.map(skill => ({
        id: skill.id,
        providerName: skill.profiles?.name || 'Unknown Provider',
        skillTitle: skill.title,
        rating: skill.reviews?.length > 0 
          ? skill.reviews.reduce((acc, review) => acc + (review.rating || 0), 0) / skill.reviews.length
          : 0,
        price: Number(skill.price),
        duration: skill.duration,
        location: skill.location || 'Remote',
        image: skill.image_url || '/placeholder.svg',
        isTopRated: skill.is_top_rated || false,
        category: skill.categories?.title || 'Uncategorized',
        description: skill.description || '',
        providerImage: skill.profiles?.avatar || '/placeholder.svg'
      }));
    } catch (error) {
      console.error('Error fetching top rated skills:', error);
      return [];
    }
  }
};
