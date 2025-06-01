
// Reviews API module
export const reviewsAPI = {
  getBySkill: async (skillId) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return [
      {
        id: '1',
        userId: '3',
        userName: 'Alice Cooper',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
        rating: 5,
        comment: 'Amazing session! Sarah really helped me understand design principles.',
        date: '2024-05-25T14:30:00Z',
        skillId,
        helpful: 12
      },
      {
        id: '2',
        userId: '4',
        userName: 'Bob Wilson',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
        rating: 5,
        comment: 'Excellent teaching style and very patient with questions.',
        date: '2024-05-20T10:15:00Z',
        skillId,
        helpful: 8
      }
    ];
  },

  getByUser: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: '1',
        skillTitle: 'UI/UX Design Consultation',
        providerName: 'Sarah Johnson',
        rating: 5,
        comment: 'Great session!',
        date: '2024-05-25T14:30:00Z'
      }
    ];
  },

  create: async (reviewData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      review: {
        id: Date.now().toString(),
        ...reviewData,
        date: new Date().toISOString(),
        helpful: 0
      }
    };
  },

  update: async (reviewId, updateData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      success: true,
      review: {
        id: reviewId,
        ...updateData
      }
    };
  },

  delete: async (reviewId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      success: true,
      message: 'Review deleted successfully'
    };
  },

  markHelpful: async (reviewId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      message: 'Review marked as helpful'
    };
  },

  reportReview: async (reviewId, reason) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      message: 'Review reported successfully'
    };
  },

  getStats: async (skillId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      averageRating: 4.8,
      totalReviews: 47,
      ratingDistribution: {
        5: 35,
        4: 8,
        3: 3,
        2: 1,
        1: 0
      }
    };
  }
};
