
// Main API service entry point
export { authAPI } from './modules/auth.js';
export { categoriesAPI } from './modules/categories.js';
export { skillsAPI } from './modules/skills.js';
export { bookingsAPI } from './modules/bookings.js';
export { searchAPI } from './modules/search.js';
export { usersAPI } from './modules/users.js';
export { reviewsAPI } from './modules/reviews.js';
export { notificationsAPI } from './modules/notifications.js';
export { paymentsAPI } from './modules/payments.js';

// Utility functions
export { dateTimeUtils } from './utils/dateTime.js';
export { imageUploadAPI } from './utils/imageUpload.js';
export { geolocationAPI } from './utils/geolocation.js';
export { ratingsUtils } from './utils/ratings.js';

// Utility function for handling API errors
export const handleAPIError = (error) => {
  console.error('API Error:', error);
  return {
    success: false,
    message: error.message || 'Something went wrong'
  };
};
