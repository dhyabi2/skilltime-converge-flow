
// Ratings utility functions
export const ratingsUtils = {
  calculateAverageRating: (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
  },

  getRatingDistribution: (reviews) => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    reviews.forEach(review => {
      if (distribution[review.rating] !== undefined) {
        distribution[review.rating]++;
      }
    });
    
    return distribution;
  },

  getRatingPercentages: (reviews) => {
    const total = reviews.length;
    if (total === 0) return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    const distribution = ratingsUtils.getRatingDistribution(reviews);
    const percentages = {};
    
    Object.keys(distribution).forEach(rating => {
      percentages[rating] = Math.round((distribution[rating] / total) * 100);
    });
    
    return percentages;
  },

  getStarDisplay: (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return {
      full: fullStars,
      half: hasHalfStar ? 1 : 0,
      empty: emptyStars
    };
  },

  getRatingColor: (rating) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    if (rating >= 3.0) return 'text-orange-600';
    return 'text-red-600';
  },

  getRatingText: (rating) => {
    if (rating >= 4.8) return 'Exceptional';
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Average';
    if (rating >= 2.0) return 'Below Average';
    return 'Poor';
  },

  sortByRating: (items, order = 'desc') => {
    return items.sort((a, b) => {
      const ratingA = a.rating || 0;
      const ratingB = b.rating || 0;
      
      return order === 'desc' ? ratingB - ratingA : ratingA - ratingB;
    });
  },

  filterByMinRating: (items, minRating) => {
    return items.filter(item => (item.rating || 0) >= minRating);
  }
};
