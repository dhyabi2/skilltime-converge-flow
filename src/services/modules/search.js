
// Search API module - Updated to use real Supabase data
import { skillsService } from '../supabase/skills';

export const searchAPI = {
  searchSkills: async (query, filters = {}) => {
    try {
      console.log('Searching for:', query, 'with filters:', filters);
      
      // Use the real Supabase skills service instead of mock data
      const skills = await skillsService.getAll({
        search: query,
        category: filters.category,
        limit: filters.limit
      });
      
      console.log('Found skills:', skills);
      
      // Apply additional client-side filtering if needed
      let filteredSkills = skills;
      
      if (filters.subcategory) {
        filteredSkills = filteredSkills.filter(skill => 
          skill.subcategory && skill.subcategory.toLowerCase() === filters.subcategory.toLowerCase()
        );
      }
      
      if (filters.maxPrice) {
        filteredSkills = filteredSkills.filter(skill => 
          Number(skill.price) <= filters.maxPrice
        );
      }
      
      return filteredSkills;
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to empty array on error
      return [];
    }
  },

  getPopularSearches: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return [
      'UI/UX Design',
      'React Development',
      'Content Writing',
      'Digital Marketing',
      'Photography',
      'Graphic Design'
    ];
  },

  getRecentSearches: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      'UI Design',
      'React',
      'Photography',
      'Content Writing'
    ];
  },

  getSuggestions: async (query) => {
    try {
      // Get suggestions from real skills data
      const skills = await skillsService.getAll({ search: query, limit: 20 });
      
      // Extract unique suggestions from titles and categories
      const suggestions = new Set();
      
      skills.forEach(skill => {
        if (skill.title && skill.title.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(skill.title);
        }
        if (skill.category && skill.category.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(skill.category);
        }
        // Include provider names in suggestions
        if (skill.profiles && skill.profiles.name && 
            skill.profiles.name.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(skill.profiles.name);
        }
      });
      
      return Array.from(suggestions).slice(0, 5);
    } catch (error) {
      console.error('Error getting suggestions:', error);
      
      // Fallback to static suggestions
      const allSuggestions = [
        'UI/UX Design',
        'React Development',
        'Content Writing',
        'Digital Marketing',
        'Photography',
        'Graphic Design',
        'Web Development',
        'Mobile App Design',
        'SEO Optimization',
        'Social Media Marketing'
      ];
      
      return allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
    }
  },

  getFilters: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      categories: ['Design', 'Development', 'Writing', 'Marketing', 'Photography'],
      subcategories: {
        'design': ['ui_ux', 'graphic_design', 'logo_design', 'web_design'],
        'development': ['frontend', 'backend', 'mobile_apps', 'fullstack'],
        'marketing': ['digital_marketing', 'social_media', 'seo', 'content_marketing'],
        'writing': ['copywriting', 'content_writing', 'technical_writing', 'creative_writing'],
        'music': ['music_production', 'mixing_mastering', 'sound_design', 'music_theory'],
        'photography': ['portrait', 'product_photography', 'event_photography', 'photo_editing']
      },
      priceRanges: [
        { label: 'Under $50', min: 0, max: 50 },
        { label: '$50 - $100', min: 50, max: 100 },
        { label: '$100 - $200', min: 100, max: 200 },
        { label: 'Over $200', min: 200, max: null }
      ],
      durations: ['30 minutes', '1 hour', '1.5 hours', '2 hours', '3+ hours'],
      locations: ['Remote', 'In-person', 'Hybrid']
    };
  }
};
