
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

interface CategoryIconFiltersProps {
  categories: any[];
  selectedCategory: string;
  onCategoryFilter: (category: string) => void;
  loading?: boolean;
}

const CategoryIconFilters: React.FC<CategoryIconFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryFilter,
  loading = false
}) => {
  const { t } = useTranslation('skills');

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

  return (
    <section>
      <h3 className="text-lg font-bold text-slate-800 mb-4">{t('filters.category')}</h3>
      <div className="flex justify-center">
        <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-sm border border-soft-blue-100">
          {/* All Categories Button */}
          <button
            onClick={() => onCategoryFilter('')}
            disabled={loading}
            className={`p-3 rounded-xl transition-all duration-300 relative ${
              selectedCategory === '' 
                ? 'bg-gradient-to-r from-soft-blue-500 to-mint-500 text-white shadow-lg transform scale-110' 
                : 'bg-white/70 hover:bg-white hover:shadow-md text-slate-600'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={t('categories.all')}
          >
            {loading && selectedCategory === '' ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <div className="text-2xl">🌟</div>
            )}
          </button>

          {/* Category Icon Buttons */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryFilter(category.title)}
              disabled={loading}
              className={`p-3 rounded-xl transition-all duration-300 relative ${
                selectedCategory === category.title 
                  ? 'bg-gradient-to-r from-soft-blue-500 to-mint-500 text-white shadow-lg transform scale-110' 
                  : 'bg-white/70 hover:bg-white hover:shadow-md text-slate-600'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={t(`categories.${category.title}`)}
            >
              {loading && selectedCategory === category.title ? (
                <Loader2 className="w-6 h-6 animate-spin text-white" />
              ) : (
                <div className="text-2xl">{getCategoryEmoji(category.iconType)}</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryIconFilters;
