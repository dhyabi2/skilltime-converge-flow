
import React from 'react';
import { Search, Languages, LogOut, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import NotificationPanel from '../notifications/NotificationPanel';

const Header = () => {
  const { t, i18n } = useTranslation('common');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const isArabic = i18n.language === 'ar';
  
  return (
    <header className="bg-gradient-to-r from-soft-blue-400 via-soft-blue-300 to-mint-400 text-slate-800 border-b border-soft-blue-200 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-800">
            {t('app.name')}
          </h1>
          {/* Elegant tagline without box structure */}
          <p className="text-sm text-slate-700/80 font-medium mt-1 italic">
            {t('app.tagline')}
          </p>
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
          
          {user && <NotificationPanel userId={user.id} />}
          
          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors border border-white/30 text-slate-700"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
