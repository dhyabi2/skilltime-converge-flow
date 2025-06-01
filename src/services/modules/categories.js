
// Categories API module with subcategories support
export const categoriesAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: '1',
        title: 'design',
        iconType: 'design',
        skillCount: 124,
        gradient: 'bg-gradient-to-br from-soft-blue-300 to-mint-300',
        subcategories: [
          { id: '1-1', title: 'ui_ux', skillCount: 45 },
          { id: '1-2', title: 'graphic_design', skillCount: 32 },
          { id: '1-3', title: 'logo_design', skillCount: 28 },
          { id: '1-4', title: 'web_design', skillCount: 19 }
        ]
      },
      {
        id: '2',
        title: 'development',
        iconType: 'development',
        skillCount: 89,
        gradient: 'bg-gradient-to-br from-soft-blue-400 to-mint-400',
        subcategories: [
          { id: '2-1', title: 'frontend', skillCount: 35 },
          { id: '2-2', title: 'backend', skillCount: 28 },
          { id: '2-3', title: 'mobile_apps', skillCount: 16 },
          { id: '2-4', title: 'fullstack', skillCount: 10 }
        ]
      },
      {
        id: '3',
        title: 'marketing',
        iconType: 'marketing',
        skillCount: 67,
        gradient: 'bg-gradient-to-br from-mint-300 to-soft-blue-300',
        subcategories: [
          { id: '3-1', title: 'digital_marketing', skillCount: 25 },
          { id: '3-2', title: 'social_media', skillCount: 20 },
          { id: '3-3', title: 'seo', skillCount: 15 },
          { id: '3-4', title: 'content_marketing', skillCount: 7 }
        ]
      },
      {
        id: '4',
        title: 'writing',
        iconType: 'writing',
        skillCount: 45,
        gradient: 'bg-gradient-to-br from-mint-400 to-soft-blue-400',
        subcategories: [
          { id: '4-1', title: 'copywriting', skillCount: 18 },
          { id: '4-2', title: 'content_writing', skillCount: 15 },
          { id: '4-3', title: 'technical_writing', skillCount: 8 },
          { id: '4-4', title: 'creative_writing', skillCount: 4 }
        ]
      },
      {
        id: '5',
        title: 'music',
        iconType: 'music',
        skillCount: 38,
        gradient: 'bg-gradient-to-br from-soft-blue-300 to-mint-300',
        subcategories: [
          { id: '5-1', title: 'music_production', skillCount: 15 },
          { id: '5-2', title: 'mixing_mastering', skillCount: 12 },
          { id: '5-3', title: 'sound_design', skillCount: 7 },
          { id: '5-4', title: 'music_theory', skillCount: 4 }
        ]
      },
      {
        id: '6',
        title: 'photography',
        iconType: 'photography',
        skillCount: 52,
        gradient: 'bg-gradient-to-br from-mint-300 to-soft-blue-300',
        subcategories: [
          { id: '6-1', title: 'portrait', skillCount: 20 },
          { id: '6-2', title: 'product_photography', skillCount: 15 },
          { id: '6-3', title: 'event_photography', skillCount: 10 },
          { id: '6-4', title: 'photo_editing', skillCount: 7 }
        ]
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
  },

  getSubcategories: async (categoryId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const category = await categoriesAPI.getById(categoryId);
    return category.subcategories || [];
  }
};
