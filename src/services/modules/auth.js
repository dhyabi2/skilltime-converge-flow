
// Auth API module
export const authAPI = {
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (email === 'demo@example.com' && password === 'demo123') {
      return {
        success: true,
        user: {
          id: '1',
          email: 'demo@example.com',
          name: 'Demo User',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
        },
        token: 'demo_token_12345'
      };
    }
    
    throw new Error('Invalid credentials');
  },

  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      user: {
        id: Date.now().toString(),
        ...userData,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
      },
      token: `token_${Date.now()}`
    };
  },

  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },

  getCurrentUser: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      phone: '+1234567890',
      location: 'San Francisco, CA'
    };
  },

  updateProfile: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      user: { ...userData, id: '1' }
    };
  },

  changePassword: async (oldPassword, newPassword) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    if (oldPassword === 'demo123') {
      return { success: true, message: 'Password updated successfully' };
    }
    
    throw new Error('Current password is incorrect');
  },

  forgotPassword: async (email) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Password reset email sent'
    };
  },

  verifyEmail: async (token) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      message: 'Email verified successfully'
    };
  }
};
