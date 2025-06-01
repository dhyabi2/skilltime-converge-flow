
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SkillCard from '../components/discovery/SkillCard';
import SearchBar from '../components/discovery/SearchBar';
import CategoryBreadcrumb from '../components/discovery/CategoryBreadcrumb';
import { skillsAPI, searchAPI, categoriesAPI } from '../services';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation('skills');
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState(searchParams.get('subcategory') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    fetchSkills();
    fetchCategories();
    if (selectedCategory) {
      fetchSubcategories();
    }
  }, [selectedCategory, selectedSubcategory, searchQuery]);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      let results;
      
      if (searchQuery) {
        results = await searchAPI.searchSkills(searchQuery, { 
          category: selectedCategory,
          subcategory: selectedSubcategory
        });
      } else {
        results = await skillsAPI.getAll({ 
          category: selectedCategory,
          subcategory: selectedSubcategory
        });
      }
      
      setSkills(results);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await categoriesAPI.getAll();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const categoryData = categories.find(cat => cat.title === selectedCategory);
      if (categoryData && categoryData.subcategories) {
        setSubcategories(categoryData.subcategories);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    updateURLParams({ search: query });
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(''); // Reset subcategory when changing category
    updateURLParams({ category, subcategory: '' });
  };

  const handleSubcategoryFilter = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    updateURLParams({ subcategory });
  };

  const updateURLParams = (updates: { [key: string]: string }) => {
    const params = new URLSearchParams();
    if (updates.search !== undefined ? updates.search : searchQuery) {
      params.set('search', updates.search !== undefined ? updates.search : searchQuery);
    }
    if (updates.category !== undefined ? updates.category : selectedCategory) {
      params.set('category', updates.category !== undefined ? updates.category : selectedCategory);
    }
    if (updates.subcategory !== undefined ? updates.subcategory : selectedSubcategory) {
      params.set('subcategory', updates.subcategory !== undefined ? updates.subcategory : selectedSubcategory);
    }
    navigate(`/browse?${params.toString()}`, { replace: true });
  };

  const handleSkillClick = (skillId: string) => {
    navigate(`/skill/${skillId}`);
  };

  const handleBreadcrumbNavigation = () => {
    if (selectedSubcategory) {
      setSelectedSubcategory('');
      updateURLParams({ subcategory: '' });
    } else if (selectedCategory) {
      setSelectedCategory('');
      updateURLParams({ category: '' });
    } else {
      navigate('/');
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  // Helper function to get emoji for category
  const getCategoryEmoji = (iconType: string) => {
    const emojiMap: { [key: string]: string } = {
      'design': '🎨',
      'development': '💻',
      'marketing': '📈',
      'writing': '✍️',
      'music': '🎵',
      'photography': '📸'
    };
    return emojiMap[iconType] || '🎨';
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
      <SearchBar 
        onSearch={handleSearch} 
        onFilterClick={() => {}} 
        initialQuery={searchQuery}
      />
      
      <div className="px-4 py-6 space-y-6">
        {/* Breadcrumb Navigation */}
        <CategoryBreadcrumb
          category={selectedCategory}
          subcategory={selectedSubcategory}
          onCategoryClick={handleBreadcrumbNavigation}
          onHomeClick={handleHomeClick}
        />

        {/* Category Filters */}
        <section>
          <h3 className="text-lg font-bold text-slate-800 mb-3">{t('filters.category')}</h3>
          <div className="flex overflow-x-auto space-x-3 rtl:space-x-reverse pb-2">
            <button
              onClick={() => handleCategoryFilter('')}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === '' 
                  ? 'bg-gradient-to-r from-soft-blue-500 to-mint-500 text-white shadow-md' 
                  : 'bg-white/70 backdrop-blur-sm text-slate-700 border border-soft-blue-200 hover:bg-white/90'
              }`}
            >
              {t('categories.all')}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.title)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors flex items-center space-x-2 rtl:space-x-reverse ${
                  selectedCategory === category.title 
                    ? 'bg-gradient-to-r from-soft-blue-500 to-mint-500 text-white shadow-md' 
                    : 'bg-white/70 backdrop-blur-sm text-slate-700 border border-soft-blue-200 hover:bg-white/90'
                }`}
              >
                <span className="text-lg">{getCategoryEmoji(category.iconType)}</span>
                <span>{t(`categories.${category.title}`)}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Subcategory Filters */}
        {selectedCategory && subcategories.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-3">{t('filters.subcategory')}</h3>
            <div className="flex overflow-x-auto space-x-3 rtl:space-x-reverse pb-2">
              <button
                onClick={() => handleSubcategoryFilter('')}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedSubcategory === '' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                    : 'bg-white/70 backdrop-blur-sm text-slate-700 border border-purple-200 hover:bg-white/90'
                }`}
              >
                {t('categories.all')}
              </button>
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => handleSubcategoryFilter(subcategory.title)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedSubcategory === subcategory.title 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                      : 'bg-white/70 backdrop-blur-sm text-slate-700 border border-purple-200 hover:bg-white/90'
                  }`}
                >
                  {t(`subcategories.${subcategory.title}`)} ({subcategory.skillCount})
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Results */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">
              {searchQuery ? `${t('discovery.search_results')} "${searchQuery}"` : 
               selectedSubcategory ? t(`subcategories.${selectedSubcategory}`) :
               selectedCategory ? t(`categories.${selectedCategory}`) :
               t('discovery.all_skills')}
            </h3>
            <span className="text-sm text-slate-600">
              {skills.length} {t('status.skills_found')}
            </span>
          </div>
          
          {skills.length > 0 ? (
            <div className="space-y-4">
              {skills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  {...skill}
                  onClick={() => handleSkillClick(skill.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">{t('status.not_found')}</h4>
              <p className="text-slate-600">
                {t('status.not_found_desc')}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Browse;
