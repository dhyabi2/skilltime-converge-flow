
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

interface CategoryBreadcrumbProps {
  category?: string;
  subcategory?: string;
  onCategoryClick?: () => void;
  onHomeClick?: () => void;
}

const CategoryBreadcrumb: React.FC<CategoryBreadcrumbProps> = ({
  category,
  subcategory,
  onCategoryClick,
  onHomeClick
}) => {
  const { t } = useTranslation('skills');

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink 
            onClick={onHomeClick}
            className="flex items-center cursor-pointer hover:text-soft-blue-600"
          >
            <Home className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
            {t('discovery.browse_categories')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {category && (
          <>
            <BreadcrumbSeparator>
              <ChevronRight className="w-4 h-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {subcategory ? (
                <BreadcrumbLink 
                  onClick={onCategoryClick}
                  className="cursor-pointer hover:text-soft-blue-600"
                >
                  {t(`categories.${category}`)}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{t(`categories.${category}`)}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}
        
        {subcategory && (
          <>
            <BreadcrumbSeparator>
              <ChevronRight className="w-4 h-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{t(`subcategories.${subcategory}`)}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CategoryBreadcrumb;
