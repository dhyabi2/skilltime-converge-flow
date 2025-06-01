// Search API module
export const searchAPI = {
  searchSkills: async (query, filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const skills = await import('./skills.js').then(module => module.skillsAPI.getAll());
    
    return skills.filter(skill => {
      const matchesQuery = !query || 
        skill.skillTitle.toLowerCase().includes(query.toLowerCase()) ||
        skill.providerName.toLowerCase().includes(query.toLowerCase()) ||
        skill.category.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = !filters.category || 
        skill.category.toLowerCase() === filters.category.toLowerCase();

      const matchesSubcategory = !filters.subcategory || 
        skill.subcategory.toLowerCase() === filters.subcategory.toLowerCase();
      
      const matchesPrice = !filters.maxPrice || skill.price <= filters.maxPrice;
      
      return matchesQuery && matchesCategory && matchesSubcategory && matchesPrice;
    });
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
    await new Promise(resolve => setTimeout(resolve, 200));
    
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
