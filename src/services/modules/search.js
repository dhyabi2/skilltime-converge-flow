
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
      
      const matchesPrice = !filters.maxPrice || skill.price <= filters.maxPrice;
      
      return matchesQuery && matchesCategory && matchesPrice;
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
  }
};
