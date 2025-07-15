
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import SearchBar from '../components/discovery/SearchBar';
import CategoryCard from '../components/discovery/CategoryCard';
import FeaturedSections from '../components/home/FeaturedSections';
import WelcomeIntroModal from '../components/home/WelcomeIntroModal';
import CategoryCardSkeleton from '../components/ui/skeletons/CategoryCardSkeleton';
import { categoriesAPI, searchAPI } from '../services';
import { useWelcomeModal } from '../hooks/useWelcomeModal';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('skills');
  const containerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen: isWelcomeOpen, closeModal: closeWelcomeModal } = useWelcomeModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await categoriesAPI.getAll();
        // Add smooth transition delay
        setTimeout(() => {
          setCategories(categoriesData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching home data:', error);
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
    console.log('Home page search initiated for:', query);
    
    if (!query.trim()) {
      console.log('Empty search query, navigating to browse');
      navigate('/browse');
      return;
    }
    
    try {
      // Test the search functionality and log results
      const results = await searchAPI.searchSkills(query.trim());
      console.log('Home page search results:', results);
      console.log(`Found ${results.length} skills for query: "${query}"`);
      
      // Navigate to browse page with search query
      navigate(`/browse?search=${encodeURIComponent(query.trim())}`);
    } catch (error) {
      console.error('Home page search error:', error);
      // Still navigate to browse page even if search fails
      navigate(`/browse?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleFilterClick = () => {
    navigate('/browse');
  };

  const handleCategoryClick = (categoryKey: string) => {
    navigate(`/browse?category=${categoryKey}`);
  };

  const handleSubcategoryClick = (categoryKey: string, subcategoryKey: string) => {
    navigate(`/browse?category=${categoryKey}&subcategory=${subcategoryKey}`);
  };

  const handleSkillClick = (skillId: string) => {
    navigate(`/skill/${skillId}`);
  };

  const renderCategoriesSection = () => {
    if (loading) {
      return (
        <section className="w-full">
          <div className="h-7 bg-turquoise-200 rounded w-48 animate-pulse mb-4 px-1"></div>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 w-full">
            {[...Array(4)].map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))}
          </div>
        </section>
      );
    }

    return (
      <section className="w-full">
        <h3 className="text-lg sm:text-xl font-bold text-turquoise-800 mb-3 sm:mb-4 font-cairo px-1">
          {t('discovery.browse_categories')}
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 w-full">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              iconType={category.iconType}
              skillCount={category.skillCount}
              gradient={category.gradient}
              subcategories={category.subcategories}
              onClick={() => handleCategoryClick(category.title)}
              onSubcategoryClick={(subcategory) => handleSubcategoryClick(category.title, subcategory)}
            />
          ))}
        </div>
      </section>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full gradient-turquoise-light flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise-500 mx-auto mb-4"></div>
          <p className="text-turquoise-700 font-cairo text-sm sm:text-base">{t('status.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen w-full gradient-turquoise-light">
        <SearchBar onSearch={handleSearch} onFilterClick={handleFilterClick} />
        
        <div ref={containerRef} className="w-full px-3 sm:px-4 lg:px-6 space-y-4 sm:space-y-6 gradient-turquoise-light">
          {/* Welcome Section */}
          <div className="text-center py-4 sm:py-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-4 sm:py-6 border border-turquoise-200 shadow-lg max-w-md mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-turquoise-800 mb-2 font-cairo">
                {t('discovery.title')}
              </h2>
              <p className="text-sm sm:text-base text-turquoise-700 font-cairo">
                {t('discovery.subtitle')}
              </p>
            </div>
          </div>

          {/* Categories with elegant loading */}
          {renderCategoriesSection()}

          {/* Featured Sections */}
          <div className="w-full">
            <FeaturedSections />
          </div>
        </div>
      </div>

      {/* Welcome Intro Modal */}
      <WelcomeIntroModal 
        isOpen={isWelcomeOpen} 
        onClose={closeWelcomeModal} 
      />
    </>
  );
};

export default Home;
