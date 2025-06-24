
import { useQuery } from '@tanstack/react-query';
import { categoriesService } from '@/services/supabase/categories';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoriesService.getById(id),
    enabled: !!id,
  });
};

export const useSubcategories = (categoryId: string) => {
  return useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: () => categoriesService.getSubcategories(categoryId),
    enabled: !!categoryId,
  });
};
