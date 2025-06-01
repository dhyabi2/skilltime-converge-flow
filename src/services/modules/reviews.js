
// Reviews API module
export const reviewsAPI = {
  getForSkill: async (skillId) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return [
      {
        id: '1',
        userId: 'user1',
        userName: 'Alice Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
        rating: 5,
        comment: 'Amazing session! Really helped me understand UI/UX principles.',
        createdAt: '2024-05-25T10:00:00Z',
        helpful: 12
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Bob Smith',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        rating: 4,
        comment: 'Great expertise and very patient teaching style.',
        createdAt: '2024-05-20T14:30:00Z',
        helpful: 8
      }
    ];
  },

  create: async (reviewData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: Date.now().toString(),
      ...reviewData,
      createdAt: new Date().toISOString(),
      helpful: 0
    };
  },

  markHelpful: async (reviewId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      message: 'Review marked as helpful'
    };
  }
};
