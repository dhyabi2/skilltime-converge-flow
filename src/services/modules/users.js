
// Users API module
export const usersAPI = {
  getProfile: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      id: userId,
      name: 'Demo User',
      email: 'demo@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Passionate learner and skill enthusiast',
      location: 'San Francisco, CA',
      phone: '+1234567890',
      joinedDate: '2024-01-15',
      completedBookings: 12,
      rating: 4.8,
      skills: ['UI/UX Design', 'React Development'],
      badges: ['Early Adopter', 'Top Learner']
    };
  },

  updateProfile: async (userId, profileData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      user: {
        id: userId,
        ...profileData
      }
    };
  },

  getPublicProfile: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id: userId,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      bio: 'UI/UX Designer with 8+ years of experience',
      rating: 4.9,
      reviewCount: 47,
      skills: ['UI Design', 'UX Research', 'Prototyping'],
      badges: ['Top Rated', 'Expert'],
      responseTime: '< 1 hour',
      completionRate: '98%'
    };
  },

  searchUsers: async (query, filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const users = [
      {
        id: '1',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
        skills: ['UI/UX Design'],
        rating: 4.9,
        location: 'Remote'
      },
      {
        id: '2',
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        skills: ['React Development'],
        rating: 4.7,
        location: 'Remote'
      }
    ];
    
    return users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    );
  },

  followUser: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      success: true,
      message: 'User followed successfully'
    };
  },

  unfollowUser: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      success: true,
      message: 'User unfollowed successfully'
    };
  },

  getFollowers: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: '3',
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'
      }
    ];
  },

  getFollowing: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: '1',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200'
      }
    ];
  }
};
