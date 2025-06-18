
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
      },
      {
        id: '7',
        title: 'business',
        iconType: 'business',
        skillCount: 78,
        gradient: 'bg-gradient-to-br from-soft-blue-400 to-mint-300',
        subcategories: [
          { id: '7-1', title: 'consulting', skillCount: 25 },
          { id: '7-2', title: 'finance', skillCount: 20 },
          { id: '7-3', title: 'project_management', skillCount: 18 },
          { id: '7-4', title: 'strategy', skillCount: 15 }
        ]
      },
      {
        id: '8',
        title: 'education',
        iconType: 'education',
        skillCount: 65,
        gradient: 'bg-gradient-to-br from-mint-400 to-soft-blue-300',
        subcategories: [
          { id: '8-1', title: 'tutoring', skillCount: 30 },
          { id: '8-2', title: 'course_creation', skillCount: 15 },
          { id: '8-3', title: 'language_teaching', skillCount: 12 },
          { id: '8-4', title: 'skill_training', skillCount: 8 }
        ]
      },
      {
        id: '9',
        title: 'fitness',
        iconType: 'fitness',
        skillCount: 42,
        gradient: 'bg-gradient-to-br from-soft-blue-300 to-mint-400',
        subcategories: [
          { id: '9-1', title: 'personal_training', skillCount: 18 },
          { id: '9-2', title: 'yoga', skillCount: 12 },
          { id: '9-3', title: 'nutrition', skillCount: 8 },
          { id: '9-4', title: 'sports_coaching', skillCount: 4 }
        ]
      },
      {
        id: '10',
        title: 'technology',
        iconType: 'technology',
        skillCount: 95,
        gradient: 'bg-gradient-to-br from-mint-300 to-soft-blue-400',
        subcategories: [
          { id: '10-1', title: 'ai_ml', skillCount: 35 },
          { id: '10-2', title: 'cybersecurity', skillCount: 25 },
          { id: '10-3', title: 'cloud_computing', skillCount: 20 },
          { id: '10-4', title: 'data_science', skillCount: 15 }
        ]
      },
      {
        id: '11',
        title: 'arts',
        iconType: 'arts',
        skillCount: 58,
        gradient: 'bg-gradient-to-br from-soft-blue-400 to-mint-300',
        subcategories: [
          { id: '11-1', title: 'painting', skillCount: 20 },
          { id: '11-2', title: 'digital_art', skillCount: 18 },
          { id: '11-3', title: 'sculpture', skillCount: 12 },
          { id: '11-4', title: 'illustration', skillCount: 8 }
        ]
      },
      {
        id: '12',
        title: 'lifestyle',
        iconType: 'lifestyle',
        skillCount: 48,
        gradient: 'bg-gradient-to-br from-mint-400 to-soft-blue-300',
        subcategories: [
          { id: '12-1', title: 'cooking', skillCount: 20 },
          { id: '12-2', title: 'gardening', skillCount: 15 },
          { id: '12-3', title: 'home_organization', skillCount: 8 },
          { id: '12-4', title: 'fashion', skillCount: 5 }
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
