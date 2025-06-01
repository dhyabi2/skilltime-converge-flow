
// Categories API module
export const categoriesAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: '1',
        title: 'design',
        iconType: 'design',
        skillCount: 124,
        gradient: 'bg-gradient-to-br from-soft-blue-300 to-mint-300'
      },
      {
        id: '2',
        title: 'development',
        iconType: 'development',
        skillCount: 89,
        gradient: 'bg-gradient-to-br from-soft-blue-400 to-mint-400'
      },
      {
        id: '3',
        title: 'marketing',
        iconType: 'marketing',
        skillCount: 67,
        gradient: 'bg-gradient-to-br from-mint-300 to-soft-blue-300'
      },
      {
        id: '4',
        title: 'writing',
        iconType: 'writing',
        skillCount: 45,
        gradient: 'bg-gradient-to-br from-mint-400 to-soft-blue-400'
      },
      {
        id: '5',
        title: 'music',
        iconType: 'music',
        skillCount: 38,
        gradient: 'bg-gradient-to-br from-soft-blue-300 to-mint-300'
      },
      {
        id: '6',
        title: 'photography',
        iconType: 'photography',
        skillCount: 52,
        gradient: 'bg-gradient-to-br from-mint-300 to-soft-blue-300'
      }
    ];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const categories = await categoriesAPI.getAll();
    const category = categories.find(cat => cat.id === id);
    
    if (!category) {
      throw new Error('Category not found');
    }
    
    return category;
  }
};
