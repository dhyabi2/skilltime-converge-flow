
// Users API module
export const usersAPI = {
  getProfile: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      id: userId,
      name: 'John Doe',
      email: 'john.doe@email.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      bio: 'Passionate about learning and sharing knowledge through skill exchange.',
      location: 'San Francisco, CA',
      memberSince: '2023-01-15',
      totalBookings: 24,
      averageRating: 4.8,
      skills: ['Photography', 'Guitar Playing', 'Spanish Language'],
      interests: ['UI/UX Design', 'React Development', 'Content Writing']
    };
  },

  updateProfile: async (userId, updates) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: userId,
        ...updates,
        updatedAt: new Date().toISOString()
      }
    };
  },

  uploadAvatar: async (userId, file) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      success: true,
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      message: 'Avatar uploaded successfully'
    };
  }
};
