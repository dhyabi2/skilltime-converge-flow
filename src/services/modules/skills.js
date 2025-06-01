
// Skills API module
export const skillsAPI = {
  getAll: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const allSkills = [
      {
        id: '1',
        providerName: 'Sarah Johnson',
        providerImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
        skillTitle: 'UI/UX Design Consultation',
        rating: 5,
        reviewCount: 47,
        price: 75,
        duration: '1 hour',
        location: 'Remote',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
        isTopRated: true,
        category: 'Design',
        description: 'Get expert guidance on your UI/UX design projects.',
        expertise: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
      },
      {
        id: '2',
        providerName: 'Mike Chen',
        providerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        skillTitle: 'React Development',
        rating: 4,
        reviewCount: 32,
        price: 85,
        duration: '2 hours',
        location: 'Remote',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
        category: 'Development',
        description: 'Build modern web applications with React.',
        expertise: ['React', 'JavaScript', 'TypeScript', 'Node.js']
      },
      {
        id: '3',
        providerName: 'Emily Rodriguez',
        providerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
        skillTitle: 'Content Writing',
        rating: 5,
        reviewCount: 28,
        price: 45,
        duration: '1.5 hours',
        location: 'Remote',
        image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800',
        isTopRated: true,
        category: 'Writing',
        description: 'Create compelling content for your business.',
        expertise: ['Copywriting', 'Blog Posts', 'SEO', 'Social Media']
      }
    ];

    // Apply filters
    let filteredSkills = allSkills;
    
    if (filters.category) {
      filteredSkills = filteredSkills.filter(skill => 
        skill.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    if (filters.search) {
      filteredSkills = filteredSkills.filter(skill =>
        skill.skillTitle.toLowerCase().includes(filters.search.toLowerCase()) ||
        skill.providerName.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    return filteredSkills;
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const skills = await skillsAPI.getAll();
    const skill = skills.find(s => s.id === id);
    
    if (!skill) {
      throw new Error('Skill not found');
    }
    
    return {
      ...skill,
      availableSlots: [
        { date: '2024-06-02', time: '10:00 AM', available: true },
        { date: '2024-06-02', time: '2:00 PM', available: true },
        { date: '2024-06-02', time: '4:00 PM', available: false },
        { date: '2024-06-03', time: '9:00 AM', available: true },
        { date: '2024-06-03', time: '11:00 AM', available: true },
        { date: '2024-06-03', time: '3:00 PM', available: true },
      ]
    };
  },

  getTopRated: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const skills = await skillsAPI.getAll();
    return skills.filter(skill => skill.isTopRated);
  }
};
