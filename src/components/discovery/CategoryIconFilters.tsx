
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

  return (
    <section className="relative">
      <h3 className="text-lg font-bold text-slate-800 mb-4">{t('filters.category')}</h3>
      <div className="relative max-w-full">
        <Carousel 
          className="w-full"
          opts={{
            align: "start",
            loop: false,
            skipSnaps: false,
            dragFree: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {/* All Categories Button */}
            <CarouselItem className="pl-2 md:pl-4 basis-auto">
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
            </CarouselItem>

            {/* Category Icon Buttons */}
            {categories.map((category) => (
              <CarouselItem key={category.id} className="pl-2 md:pl-4 basis-auto">
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
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Custom Navigation Buttons */}
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border border-soft-blue-200 hover:bg-white hover:border-soft-blue-300 transition-all duration-200 shadow-sm" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border border-soft-blue-200 hover:bg-white hover:border-soft-blue-300 transition-all duration-200 shadow-sm" />
        </Carousel>
      </div>
    </section>
  );
};

export default CategoryIconFilters;
