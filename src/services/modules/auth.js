
// Authentication API module
export const authAPI = {
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@skilltime.com' && password === 'password') {
      return {
        success: true,
        user: {
          id: '1',
          name: 'John Doe',
          email: 'admin@skilltime.com',
          type: 'provider',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'
        },
        token: 'mock-jwt-token-123'
      };
    }
    
    throw new Error('Invalid credentials');
  },

  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      success: true,
      user: {
        id: Date.now().toString(),
        ...userData,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'
      },
      token: 'mock-jwt-token-' + Date.now()
    };
  },

  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};
