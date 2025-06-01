
// Main API service entry point
export { authAPI } from './modules/auth.js';
export { categoriesAPI } from './modules/categories.js';
export { skillsAPI } from './modules/skills.js';
export { bookingsAPI } from './modules/bookings.js';
export { searchAPI } from './modules/search.js';

// Utility function for handling API errors
export const handleAPIError = (error) => {
  console.error('API Error:', error);
  return {
    success: false,
    message: error.message || 'Something went wrong'
  };
};
