// Search API module - Updated to use real Supabase data
import { skillsService } from '../supabase/skills';

export const searchAPI = {
  searchSkills: async (query, filters = {}) => {
    try {
      console.log('searchAPI.searchSkills called with query:', query, 'filters:', filters);
      
      if (!query || !query.trim()) {
        console.log('Empty search query, returning empty results');
        return [];
      }
      
      // Use the real Supabase skills service with enhanced search
      const skills = await skillsService.getAll({
        search: query.trim(),
        category: filters.category,
        subcategory: filters.subcategory,
        limit: filters.limit
      });
      
      console.log('Search results from skillsService:', skills);
      
      // Apply additional client-side filtering if needed
      let filteredSkills = skills;
      
      // The main filtering is now handled in skillsService.getAll
      // but we can add additional filters here if needed
      
      if (filters.maxPrice) {
        filteredSkills = filteredSkills.filter(skill => 
          Number(skill.price) <= filters.maxPrice
        );
      }
      
      console.log('Final search results:', filteredSkills);
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
      // Get suggestions from real skills data with enhanced search
      const skills = await skillsService.getAll({ search: query, limit: 20 });
      
      // Extract unique suggestions from titles, categories, and provider names
      const suggestions = new Set();
      
      skills.forEach(skill => {
        const queryLower = query.toLowerCase();
        
        // Add skill titles that contain the query
        if (skill.skillTitle && skill.skillTitle.toLowerCase().includes(queryLower)) {
          suggestions.add(skill.skillTitle);
        }
        
        // Add categories that contain the query
        if (skill.category && skill.category.toLowerCase().includes(queryLower)) {
          suggestions.add(skill.category);
        }
        
        // Add provider names that contain the query
        if (skill.providerName && skill.providerName.toLowerCase().includes(queryLower)) {
          suggestions.add(skill.providerName);
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
