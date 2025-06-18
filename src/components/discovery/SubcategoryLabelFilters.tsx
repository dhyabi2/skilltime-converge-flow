
import React from 'react';
import { useTranslation } from 'react-i18next';

interface SubcategoryLabelFiltersProps {
  subcategories: any[];
  selectedSubcategory: string;
  onSubcategoryFilter: (subcategory: string) => void;
}

const SubcategoryLabelFilters: React.FC<SubcategoryLabelFiltersProps> = ({
  subcategories,
  selectedSubcategory,
  onSubcategoryFilter
}) => {
  const { t } = useTranslation('skills');

  if (subcategories.length === 0) {
    return null;
  }

  return (
    <section>
      <h3 className="text-lg font-bold text-slate-800 mb-4">{t('filters.subcategory')}</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {/* All Subcategories */}
        <button
          onClick={() => onSubcategoryFilter('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedSubcategory === '' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
              : 'bg-white/80 backdrop-blur-sm text-slate-700 border border-purple-200 hover:bg-white hover:shadow-sm hover:border-purple-300'
          }`}
        >
          {t('categories.all')}
        </button>

        {/* Subcategory Labels */}
        {subcategories.map((subcategory) => (
          <button
            key={subcategory.id}
            onClick={() => onSubcategoryFilter(subcategory.title)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedSubcategory === subcategory.title 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                : 'bg-white/80 backdrop-blur-sm text-slate-700 border border-purple-200 hover:bg-white hover:shadow-sm hover:border-purple-300'
            }`}
          >
            <span>{t(`subcategories.${subcategory.title}`)}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              selectedSubcategory === subcategory.title 
                ? 'bg-white/20 text-white' 
                : 'bg-purple-100 text-purple-600'
            }`}>
              {subcategory.skillCount}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default SubcategoryLabelFilters;
