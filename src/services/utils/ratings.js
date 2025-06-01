
// Rating and review calculation utilities
export const ratingsUtils = {
  calculateAverageRating: (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  },

  getRatingDistribution: (reviews) => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    
    return distribution;
  },

  getRecentReviews: (reviews, count = 5) => {
    return reviews
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, count);
  },

  filterReviewsByRating: (reviews, minRating) => {
    return reviews.filter(review => review.rating >= minRating);
  },

  calculateProviderStats: (skills) => {
    const totalReviews = skills.reduce((acc, skill) => acc + skill.reviewCount, 0);
    const totalRating = skills.reduce((acc, skill) => acc + (skill.rating * skill.reviewCount), 0);
    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;
    
    return {
      totalSkills: skills.length,
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      totalBookings: skills.reduce((acc, skill) => acc + (skill.bookings || 0), 0)
    };
  }
};
