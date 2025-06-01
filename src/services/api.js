
// Dummy API service with mock data and functions

// Mock data
const mockUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    rating: 4.9,
    skills: ['UI/UX Design', 'Figma', 'Prototyping'],
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    rating: 4.7,
    skills: ['React', 'Node.js', 'TypeScript'],
    location: 'Remote'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 4.8,
    skills: ['Content Writing', 'SEO', 'Copywriting'],
    location: 'New York, NY'
  }
];

const mockSkills = [
  {
    id: '1',
    providerId: '1',
    providerName: 'Sarah Johnson',
    skillTitle: 'UI/UX Design Consultation',
    description: 'Get expert advice on your user interface and experience design. I\'ll help you create intuitive and beautiful designs.',
    category: 'Design',
    rating: 5,
    price: 75,
    duration: '1 hour',
    location: 'Remote',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
    isTopRated: true,
    tags: ['UI', 'UX', 'Figma', 'Design System']
  },
  {
    id: '2',
    providerId: '2',
    providerName: 'Mike Chen',
    skillTitle: 'React Development',
    description: 'Learn modern React development with hooks, context, and best practices. Build real-world applications.',
    category: 'Development',
    rating: 4,
    price: 85,
    duration: '2 hours',
    location: 'Remote',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
    isTopRated: false,
    tags: ['React', 'JavaScript', 'Frontend', 'Hooks']
  },
  {
    id: '3',
    providerId: '3',
    providerName: 'Emily Rodriguez',
    skillTitle: 'Content Writing',
    description: 'Professional content writing for blogs, websites, and marketing materials. SEO-optimized and engaging.',
    category: 'Writing',
    rating: 5,
    price: 45,
    duration: '1.5 hours',
    location: 'Remote',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400',
    isTopRated: true,
    tags: ['Writing', 'SEO', 'Content Strategy', 'Copywriting']
  }
];

const mockBookings = [
  {
    id: 'booking-1',
    skillId: '1',
    userId: '1',
    providerName: 'Sarah Johnson',
    skillTitle: 'UI/UX Design Consultation',
    date: '2024-06-15',
    time: '14:00',
    duration: '1 hour',
    status: 'confirmed',
    price: 75
  },
  {
    id: 'booking-2',
    skillId: '2',
    userId: '2',
    providerName: 'Mike Chen',
    skillTitle: 'React Development',
    date: '2024-06-18',
    time: '10:00',
    duration: '2 hours',
    status: 'pending',
    price: 85
  }
];

const mockCategories = [
  { id: 'design', name: 'Design', icon: '🎨', skillCount: 124 },
  { id: 'development', name: 'Development', icon: '💻', skillCount: 89 },
  { id: 'marketing', name: 'Marketing', icon: '📈', skillCount: 67 },
  { id: 'writing', name: 'Writing', icon: '✍️', skillCount: 45 },
  { id: 'music', name: 'Music', icon: '🎵', skillCount: 38 },
  { id: 'photography', name: 'Photography', icon: '📸', skillCount: 52 }
];

// Utility function to simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// API Functions
export const api = {
  // Auth functions
  login: async (email, password) => {
    await delay();
    if (email === 'admin@example.com' && password === 'password') {
      return {
        success: true,
        user: mockUsers[0],
        token: 'fake-jwt-token'
      };
    }
    return {
      success: false,
      error: 'Invalid credentials'
    };
  },

  register: async (userData) => {
    await delay();
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      rating: 0,
      skills: []
    };
    mockUsers.push(newUser);
    return {
      success: true,
      user: newUser,
      token: 'fake-jwt-token'
    };
  },

  // Skills functions
  getSkills: async (filters = {}) => {
    await delay();
    let filteredSkills = [...mockSkills];
    
    if (filters.category) {
      filteredSkills = filteredSkills.filter(skill => 
        skill.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    if (filters.search) {
      filteredSkills = filteredSkills.filter(skill =>
        skill.skillTitle.toLowerCase().includes(filters.search.toLowerCase()) ||
        skill.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        skill.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }
    
    return {
      success: true,
      data: filteredSkills,
      total: filteredSkills.length
    };
  },

  getSkillById: async (id) => {
    await delay();
    const skill = mockSkills.find(s => s.id === id);
    if (skill) {
      return {
        success: true,
        data: skill
      };
    }
    return {
      success: false,
      error: 'Skill not found'
    };
  },

  getTopRatedSkills: async () => {
    await delay();
    const topSkills = mockSkills.filter(skill => skill.isTopRated);
    return {
      success: true,
      data: topSkills
    };
  },

  // Categories functions
  getCategories: async () => {
    await delay();
    return {
      success: true,
      data: mockCategories
    };
  },

  // Bookings functions
  getBookings: async (userId) => {
    await delay();
    const userBookings = mockBookings.filter(booking => booking.userId === userId);
    return {
      success: true,
      data: userBookings
    };
  },

  createBooking: async (bookingData) => {
    await delay();
    const newBooking = {
      id: `booking-${Date.now()}`,
      ...bookingData,
      status: 'pending'
    };
    mockBookings.push(newBooking);
    return {
      success: true,
      data: newBooking
    };
  },

  getBookingById: async (id) => {
    await delay();
    const booking = mockBookings.find(b => b.id === id);
    if (booking) {
      return {
        success: true,
        data: booking
      };
    }
    return {
      success: false,
      error: 'Booking not found'
    };
  },

  // Users functions
  getUserProfile: async (id) => {
    await delay();
    const user = mockUsers.find(u => u.id === id);
    if (user) {
      return {
        success: true,
        data: user
      };
    }
    return {
      success: false,
      error: 'User not found'
    };
  },

  updateUserProfile: async (id, userData) => {
    await delay();
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
      return {
        success: true,
        data: mockUsers[userIndex]
      };
    }
    return {
      success: false,
      error: 'User not found'
    };
  },

  // Search function
  searchSkills: async (query) => {
    await delay();
    const results = mockSkills.filter(skill =>
      skill.skillTitle.toLowerCase().includes(query.toLowerCase()) ||
      skill.description.toLowerCase().includes(query.toLowerCase()) ||
      skill.providerName.toLowerCase().includes(query.toLowerCase()) ||
      skill.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    return {
      success: true,
      data: results,
      query
    };
  }
};

// Export individual functions for easier imports
export const {
  login,
  register,
  getSkills,
  getSkillById,
  getTopRatedSkills,
  getCategories,
  getBookings,
  createBooking,
  getBookingById,
  getUserProfile,
  updateUserProfile,
  searchSkills
} = api;

export default api;
