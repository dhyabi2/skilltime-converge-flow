
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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
      'photography': '📸',
      'business': '💼',
      'education': '🎓',
      'fitness': '💪',
      'technology': '⚡',
      'arts': '🎭',
      'lifestyle': '🌿'
    };
    return emojiMap[iconType] || '🎨';
  };

  // Calculate total skills count for "All Categories"
  const totalSkillsCount = categories.reduce((total, category) => total + (category.skillCount || 0), 0);

  return (
    <section className="relative w-full">
      <h3 className="text-lg font-bold text-slate-800 mb-4">{t('filters.category')}</h3>
      <div className="relative w-full px-4">
        <Carousel 
          className="w-full"
          opts={{
            align: "start",
            loop: false,
            skipSnaps: false,
            dragFree: true,
            containScroll: "trimSnaps",
          }}
        >
          <CarouselContent className="ml-2 mr-2">
            {/* All Categories Button */}
            <CarouselItem className="basis-auto pl-1 pr-1">
              <div className="flex flex-col items-center space-y-2">
                <button
                  onClick={() => onCategoryFilter('')}
                  disabled={loading}
                  className={`p-3 rounded-xl transition-all duration-300 relative flex-shrink-0 ${
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
                <div className="text-center">
                  <p className="text-xs font-medium text-slate-700">{t('categories.all')}</p>
                  <p className="text-xs text-slate-500">{totalSkillsCount} {t('labels.skills')}</p>
                </div>
              </div>
            </CarouselItem>

            {/* Category Icon Buttons */}
            {categories.map((category) => (
              <CarouselItem key={category.id} className="basis-auto pl-1 pr-1">
                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={() => onCategoryFilter(category.title)}
                    disabled={loading}
                    className={`p-3 rounded-xl transition-all duration-300 relative flex-shrink-0 ${
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
                  <div className="text-center">
                    <p className="text-xs font-medium text-slate-700">{t(`categories.${category.title}`)}</p>
                    <p className="text-xs text-slate-500">{category.skillCount} {t('labels.skills')}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Custom Navigation Buttons */}
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-soft-blue-200 hover:bg-white hover:border-soft-blue-300 transition-all duration-200 shadow-md z-10" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-soft-blue-200 hover:bg-white hover:border-soft-blue-300 transition-all duration-200 shadow-md z-10" />
        </Carousel>
      </div>
    </section>
  );
};

export default CategoryIconFilters;
