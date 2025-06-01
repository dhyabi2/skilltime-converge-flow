
// Categories API module
export const categoriesAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: '1',
        title: 'التصميم',
        icon: '🎨',
        skillCount: 124,
        gradient: 'bg-gradient-to-br from-purple-500 to-pink-500'
      },
      {
        id: '2',
        title: 'البرمجة',
        icon: '💻',
        skillCount: 89,
        gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500'
      },
      {
        id: '3',
        title: 'التسويق',
        icon: '📈',
        skillCount: 67,
        gradient: 'bg-gradient-to-br from-green-500 to-emerald-500'
      },
      {
        id: '4',
        title: 'الكتابة',
        icon: '✍️',
        skillCount: 45,
        gradient: 'bg-gradient-to-br from-orange-500 to-red-500'
      },
      {
        id: '5',
        title: 'الموسيقى',
        icon: '🎵',
        skillCount: 38,
        gradient: 'bg-gradient-to-br from-violet-500 to-purple-500'
      },
      {
        id: '6',
        title: 'التصوير',
        icon: '📸',
        skillCount: 52,
        gradient: 'bg-gradient-to-br from-teal-500 to-blue-500'
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
