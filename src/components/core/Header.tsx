
import React from 'react';
import { Search, Bell, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Switch } from "@/components/ui/switch";

const Header = () => {
  const { t, i18n } = useTranslation('common');
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  const isArabic = i18n.language === 'ar';
  
  return (
    <header className="bg-black text-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">
            {t('app.name')}
          </h1>
          <p className="text-xs text-gray-300">{t('app.tagline')}</p>
        </div>
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* Language Toggle */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white/10 rounded-full px-3 py-2">
            <Languages className="w-4 h-4 text-white" />
            <span className="text-xs text-white">EN</span>
            <Switch
              checked={isArabic}
              onCheckedChange={toggleLanguage}
              className="data-[state=checked]:bg-white data-[state=unchecked]:bg-white/30"
            />
            <span className="text-xs text-white">AR</span>
          </div>
          
          <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Search className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors relative">
            <Bell className="w-5 h-5 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
