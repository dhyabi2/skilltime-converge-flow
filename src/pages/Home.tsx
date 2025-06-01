import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import SearchBar from '../components/discovery/SearchBar';
import CategoryCard from '../components/discovery/CategoryCard';
import SkillCard from '../components/discovery/SkillCard';

const Home = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      title: 'Design',
      icon: '🎨',
      skillCount: 124,
      gradient: 'bg-black'
    },
    {
      title: 'Development',
      icon: '💻',
      skillCount: 89,
      gradient: 'bg-black'
    },
    {
      title: 'Marketing',
      icon: '📈',
      skillCount: 67,
      gradient: 'bg-black'
    },
    {
      title: 'Writing',
      icon: '✍️',
      skillCount: 45,
      gradient: 'bg-black'
    },
    {
      title: 'Music',
      icon: '🎵',
      skillCount: 38,
      gradient: 'bg-black'
    },
    {
      title: 'Photography',
      icon: '📸',
      skillCount: 52,
      gradient: 'bg-black'
    }
  ];

  const topSkills = [
    {
      id: '1',
      providerName: 'Sarah Johnson',
      skillTitle: 'UI/UX Design Consultation',
      rating: 5,
      price: 75,
      duration: '1 hour',
      location: 'Remote',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
      isTopRated: true
    },
    {
      id: '2',
      providerName: 'Mike Chen',
      skillTitle: 'React Development',
      rating: 4,
      price: 85,
      duration: '2 hours',
      location: 'Remote',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400'
    },
    {
      id: '3',
      providerName: 'Emily Rodriguez',
      skillTitle: 'Content Writing',
      rating: 5,
      price: 45,
      duration: '1.5 hours',
      location: 'Remote',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400',
      isTopRated: true
    }
  ];

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.2
        }
      );
    }
  }, []);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement search functionality
  };

  const handleFilterClick = () => {
    console.log('Opening filters');
    // Implement filter modal
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/browse?category=${category.toLowerCase()}`);
  };

  const handleSkillClick = (skillId: string) => {
    navigate(`/skill/${skillId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SearchBar onSearch={handleSearch} onFilterClick={handleFilterClick} />
      
      <div ref={containerRef} className="px-4 space-y-6 bg-gray-100">
        {/* Welcome Section */}
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-black mb-2">
            Discover Amazing Skills
          </h2>
          <p className="text-gray-700">
            Connect with talented professionals and learn new skills
          </p>
        </div>

        {/* Categories */}
        <section>
          <h3 className="text-xl font-bold text-black mb-4">Browse Categories</h3>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                icon={category.icon}
                skillCount={category.skillCount}
                gradient={category.gradient}
                onClick={() => handleCategoryClick(category.title)}
              />
            ))}
          </div>
        </section>

        {/* Top Rated Skills */}
        <section>
          <h3 className="text-xl font-bold text-black mb-4">Top Rated Skills</h3>
          <div className="space-y-4">
            {topSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                {...skill}
                onClick={() => handleSkillClick(skill.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
