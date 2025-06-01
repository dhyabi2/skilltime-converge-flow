
// Image upload utility functions
export const imageUploadAPI = {
  uploadProfileImage: async (file) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate file validation
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size too large. Maximum 5MB allowed.');
    }
    
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type. Only images are allowed.');
    }
    
    return {
      success: true,
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      filename: `profile_${Date.now()}.jpg`,
      size: file.size
    };
  },

  uploadSkillImage: async (file) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      filename: `skill_${Date.now()}.jpg`,
      size: file.size
    };
  },

  deleteImage: async (imageUrl) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      message: 'Image deleted successfully'
    };
  }
};
