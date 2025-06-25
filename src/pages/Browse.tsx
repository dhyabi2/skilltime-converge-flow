import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchBar from '../components/discovery/SearchBar';
import CategoryBreadcrumb from '../components/discovery/CategoryBreadcrumb';
import CategoryIconFilters from '../components/discovery/CategoryIconFilters';
import SubcategoryLabelFilters from '../components/discovery/SubcategoryLabelFilters';
import SkillResults from '../components/discovery/SkillResults';
import FilterModal from '../components/search/FilterModal';
import SkillCardSkeleton from '../components/ui/skeletons/SkillCardSkeleton';
import { skillsAPI, searchAPI, categoriesAPI } from '../services';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation('skills');
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState(searchParams.get('subcategory') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSkills();
    if (selectedCategory) {
      fetchSubcategories();
    }
  }, [selectedCategory, selectedSubcategory, searchQuery]);

  const fetchSkills = async () => {
    try {
      setSkillsLoading(true);
      console.log('Fetching skills with params:', { 
        searchQuery, 
        selectedCategory, 
        selectedSubcategory 
      });
      
      let results;
      
      if (searchQuery) {
        console.log('Using search API for query:', searchQuery);
        results = await searchAPI.searchSkills(searchQuery, {
          category: selectedCategory,
          subcategory: selectedSubcategory,
          maxPrice
        });
      } else {
        console.log('Using skills API for category browsing');
        results = await skillsAPI.getAll({
          category: selectedCategory,
          subcategory: selectedSubcategory,
          maxPrice
        });
      }
      
      console.log('Fetched skills results:', results);
      
      // Add a small delay for smooth transition
      setTimeout(() => {
        setSkills(results);
        setSkillsLoading(false);
      }, 300);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setSkillsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await categoriesAPI.getAll();
      setCategories(categoriesData);
      setCategoriesLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategoriesLoading(false);
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

  const handleFilterClick = () => {
    setFiltersOpen(true);
  };

  const handleApplyFilters = (values: { category?: string; subcategory?: string; maxPrice?: number }) => {
    if (values.category !== undefined) setSelectedCategory(values.category);
    if (values.subcategory !== undefined) setSelectedSubcategory(values.subcategory || '');
    if (values.maxPrice !== undefined) setMaxPrice(values.maxPrice);
    updateURLParams({ category: values.category || '', subcategory: values.subcategory || '', search: searchQuery });
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

  const renderSkillsSection = () => {
    if (skillsLoading) {
      return (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="h-7 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <SkillCardSkeleton key={index} />
            ))}
          </div>
        </section>
      );
    }

    return (
      <SkillResults
        skills={skills}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onSkillClick={handleSkillClick}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-mint-50 to-soft-blue-100">
      <SearchBar
        onSearch={handleSearch}
        onFilterClick={handleFilterClick}
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

        {/* Category Icon Filters */}
        {categoriesLoading ? (
          <section>
            <div className="h-7 bg-gray-200 rounded w-32 animate-pulse mb-4"></div>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="w-14 h-14 bg-gray-200 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <CategoryIconFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryFilter={handleCategoryFilter}
          />
        )}

        {/* Subcategory Label Filters */}
        {selectedCategory && (
          <SubcategoryLabelFilters
            subcategories={subcategories}
            selectedSubcategory={selectedSubcategory}
            onSubcategoryFilter={handleSubcategoryFilter}
          />
        )}

        {/* Results with elegant loading */}
        {renderSkillsSection()}
      </div>

      <FilterModal
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApply={handleApplyFilters}
        initialValues={{ category: selectedCategory, subcategory: selectedSubcategory, maxPrice }}
      />
    </div>
  );
};

export default Browse;
