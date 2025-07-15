
import React from 'react';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Switch } from "@/components/ui/switch";

const LanguageToggle = () => {
  const { i18n, t } = useTranslation('common');
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  const isArabic = i18n.language === 'ar';

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/40 backdrop-blur-sm border border-white/50">
      <div className="flex items-center gap-2">
        <Languages className="w-4 h-4 text-slate-700" />
        <span className="text-sm font-medium text-slate-700">{t('labels.language')}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold transition-colors duration-200 ${!isArabic ? 'text-slate-800' : 'text-slate-600'}`}>
          EN
        </span>
        <Switch
          checked={isArabic}
          onCheckedChange={toggleLanguage}
          className="data-[state=checked]:bg-soft-blue-600 data-[state=unchecked]:bg-white/60"
        />
        <span className={`text-xs font-bold transition-colors duration-200 ${isArabic ? 'text-slate-800' : 'text-slate-600'}`}>
          ع
        </span>
      </div>
    </div>
  );
};

export default LanguageToggle;
