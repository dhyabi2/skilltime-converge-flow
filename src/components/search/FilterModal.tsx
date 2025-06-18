import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { categoriesAPI } from '@/services/modules/categories';

interface FilterValues {
  category?: string;
  subcategory?: string;
  maxPrice?: number;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (values: FilterValues) => void;
  initialValues?: FilterValues;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply, initialValues }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [values, setValues] = useState<FilterValues>(initialValues || {});
  const { t } = useTranslation('skills');

  useEffect(() => {
    categoriesAPI.getAll().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    setValues(initialValues || {});
  }, [initialValues, isOpen]);

  const subcategories = categories.find(c => c.title === values.category)?.subcategories || [];

  const handleApply = () => {
    onApply(values);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('filter_modal.title')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="mb-1 text-sm font-medium">{t('filter_modal.category')}</p>
            <Select value={values.category} onValueChange={v => setValues({ ...values, category: v, subcategory: '' })}>
              <SelectTrigger>
                <SelectValue placeholder={t('filter_modal.placeholder_category')} />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.title}>{cat.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {subcategories.length > 0 && (
            <div>
              <p className="mb-1 text-sm font-medium">{t('filter_modal.subcategory')}</p>
              <Select value={values.subcategory} onValueChange={v => setValues({ ...values, subcategory: v })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('filter_modal.placeholder_subcategory')} />
                </SelectTrigger>
                <SelectContent>
                  {subcategories.map((sub: any) => (
                    <SelectItem key={sub.id} value={sub.title}>{sub.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <p className="mb-1 text-sm font-medium">{t('filter_modal.max_price')}</p>
            <Input
              type="number"
              value={values.maxPrice ?? ''}
              onChange={e => setValues({ ...values, maxPrice: Number(e.target.value) })}
              placeholder={t('filter_modal.no_limit')}
            />
          </div>
          <div className="flex justify-end pt-2 space-x-2 rtl:space-x-reverse">
            <Button variant="outline" onClick={onClose}>{t('filter_modal.cancel')}</Button>
            <Button onClick={handleApply}>{t('filter_modal.apply')}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
