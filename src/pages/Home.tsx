
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import SearchBar from '../components/discovery/SearchBar';
import CategoryCard from '../components/discovery/CategoryCard';
import SkillCard from '../components/discovery/SkillCard';
import { categoriesAPI, skillsAPI, searchAPI } from '../services';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('skills');
  const containerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState([]);
  const [topSkills, setTopSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesData, topSkillsData] = await Promise.all([
          categoriesAPI.getAll(),
          skillsAPI.getTopRated()
        ]);
        
        setCategories(categoriesData);
        setTopSkills(topSkillsData);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (containerRef.current && !loading) {
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
  }, [loading]);

  const handleSearch = async (query: string) => {
    console.log('Searching for:', query);
    try {
      const results = await searchAPI.searchSkills(query);
      console.log('Search results:', results);
      // Navigate to browse page with search results
      navigate(`/browse?search=${encodeURIComponent(query)}`);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleFilterClick = () => {
    console.log('Opening filters');
    // Implement filter modal
  };

  const handleCategoryClick = (categoryKey: string) => {
    navigate(`/browse?category=${categoryKey}`);
  };

  const handleSkillClick = (skillId: string) => {
    navigate(`/skill/${skillId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-mint-50 to-soft-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-soft-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600">{t('status.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-mint-50 to-soft-blue-100">
      <SearchBar onSearch={handleSearch} onFilterClick={handleFilterClick} />
      
      <div ref={containerRef} className="px-4 space-y-6 bg-gradient-to-br from-soft-blue-50 via-mint-50 to-soft-blue-100">
        {/* Welcome Section */}
        <div className="text-center py-4">
          <div className="bg-gradient-to-r from-white/40 to-mint-100/50 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30 shadow-sm max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {t('discovery.title')}
            </h2>
            <p className="text-slate-700">
              {t('discovery.subtitle')}
            </p>
          </div>
        </div>

        {/* Categories */}
        <section>
          <h3 className="text-xl font-bold text-slate-800 mb-4">{t('discovery.browse_categories')}</h3>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.title}
                iconType={category.iconType}
                skillCount={category.skillCount}
                gradient={category.gradient}
                onClick={() => handleCategoryClick(category.title)}
              />
            ))}
          </div>
        </section>

        {/* Top Rated Skills */}
        <section>
          <h3 className="text-xl font-bold text-slate-800 mb-4">{t('discovery.top_rated')}</h3>
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
