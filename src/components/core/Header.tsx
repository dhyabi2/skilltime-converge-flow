
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
    <header className="bg-gradient-to-r from-soft-blue-400 via-soft-blue-300 to-mint-400 text-slate-800 border-b border-soft-blue-200 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-800">
            {t('app.name')}
          </h1>
          {/* Enhanced tagline with gradient background */}
          <div className="bg-gradient-to-r from-white/30 to-mint-100/40 backdrop-blur-sm rounded-lg px-3 py-1 mt-1 border border-white/20 shadow-sm">
            <p className="text-sm text-slate-700 font-medium">{t('app.tagline')}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* Language Toggle */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 border border-white/30">
            <Languages className="w-4 h-4 text-slate-700" />
            <span className="text-xs text-slate-700 font-medium">EN</span>
            <Switch
              checked={isArabic}
              onCheckedChange={toggleLanguage}
              className="data-[state=checked]:bg-soft-blue-600 data-[state=unchecked]:bg-white/40"
            />
            <span className="text-xs text-slate-700 font-medium">AR</span>
          </div>
          
          <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors border border-white/30">
            <Search className="w-5 h-5 text-slate-700" />
          </button>
          <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors relative border border-white/30">
            <Bell className="w-5 h-5 text-slate-700" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-mint-400 to-mint-500 rounded-full border border-white"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
