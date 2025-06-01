import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SkillCard from '../components/discovery/SkillCard';
import SearchBar from '../components/discovery/SearchBar';
import EmotionalCard from '../components/emotional/EmotionalCard';
import JourneyAnimator from '../components/emotional/JourneyAnimator';
import ContextualAnimations from '../components/emotional/ContextualAnimations';
import { EmotionalProvider } from '../components/emotional/EmotionalContext';
import { skillsAPI, searchAPI, categoriesAPI } from '../services';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    fetchSkills();
    fetchCategories();
  }, [selectedCategory, searchQuery]);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      let results;
      
      if (searchQuery) {
        results = await searchAPI.searchSkills(searchQuery, { 
          category: selectedCategory 
        });
      } else {
        results = await skillsAPI.getAll({ 
          category: selectedCategory 
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

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    // Update URL params
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    if (selectedCategory) params.set('category', selectedCategory);
    navigate(`/browse?${params.toString()}`, { replace: true });
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    // Update URL params
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (category) params.set('category', category);
    navigate(`/browse?${params.toString()}`, { replace: true });
  };

  const handleSkillClick = (skillId: string) => {
    navigate(`/skill/${skillId}`);
  };

  const handleEmotionalResponse = (emotion: string, skillId?: string) => {
    console.log(`Emotional response: ${emotion} for skill: ${skillId}`);
    // Track user emotional engagement for analytics
  };

  if (loading) {
    return (
      <EmotionalProvider>
        <JourneyAnimator phase="discovery">
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <ContextualAnimations skillCategory="general">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                <p className="text-gray-600">Finding skills...</p>
              </div>
            </ContextualAnimations>
          </div>
        </JourneyAnimator>
      </EmotionalProvider>
    );
  }

  return (
    <EmotionalProvider>
      <div className="min-h-screen bg-gray-50">
        <SearchBar 
          onSearch={handleSearch} 
          onFilterClick={() => {}} 
          initialQuery={searchQuery}
        />
        
        <JourneyAnimator phase="consideration" className="px-4 py-6 space-y-6">
          {/* Category Filters */}
          <section>
            <h3 className="text-lg font-bold text-black mb-3">Filter by Category</h3>
            <ContextualAnimations skillCategory="navigation">
              <div className="flex overflow-x-auto space-x-3 pb-2">
                <EmotionalCard 
                  skillCategory="navigation"
                  emotionalIntensity="low"
                  onEmotionalResponse={(emotion) => handleEmotionalResponse(emotion, 'all-categories')}
                >
                  <button
                    onClick={() => handleCategoryFilter('')}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === '' 
                        ? 'bg-black text-white' 
                        : 'bg-white text-gray-700 border border-gray-300'
                    }`}
                  >
                    All Categories
                  </button>
                </EmotionalCard>
                
                {categories.map((category) => (
                  <EmotionalCard 
                    key={category.id}
                    skillCategory={category.title}
                    emotionalIntensity="medium"
                    onEmotionalResponse={(emotion) => handleEmotionalResponse(emotion, category.id)}
                  >
                    <button
                      onClick={() => handleCategoryFilter(category.title)}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                        selectedCategory === category.title 
                          ? 'bg-black text-white' 
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {category.icon} {category.title}
                    </button>
                  </EmotionalCard>
                ))}
              </div>
            </ContextualAnimations>
          </section>

          {/* Results */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-black">
                {searchQuery ? `Search results for "${searchQuery}"` : 'All Skills'}
              </h3>
              <span className="text-sm text-gray-600">
                {skills.length} skill{skills.length !== 1 ? 's' : ''} found
              </span>
            </div>
            
            {skills.length > 0 ? (
              <div className="space-y-4">
                {skills.map((skill) => (
                  <EmotionalCard
                    key={skill.id}
                    skillCategory={skill.category || 'general'}
                    emotionalIntensity="high"
                    onEmotionalResponse={(emotion) => handleEmotionalResponse(emotion, skill.id)}
                    className="w-full"
                  >
                    <ContextualAnimations skillCategory={skill.category || 'general'}>
                      <SkillCard
                        {...skill}
                        onClick={() => handleSkillClick(skill.id)}
                      />
                    </ContextualAnimations>
                  </EmotionalCard>
                ))}
              </div>
            ) : (
              <ContextualAnimations skillCategory="empty-state">
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🔍</div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">No skills found</h4>
                  <p className="text-gray-600">
                    Try adjusting your search terms or category filters
                  </p>
                </div>
              </ContextualAnimations>
            )}
          </section>
        </JourneyAnimator>
      </div>
    </EmotionalProvider>
  );
};

export default Browse;
