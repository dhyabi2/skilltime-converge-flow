
import React, { useState } from 'react';
import { Search, Languages, LogOut, User, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import NotificationPanel from '../notifications/NotificationPanel';
import SearchModal from '../search/SearchModal';

const Header = () => {
  const { t, i18n } = useTranslation('common');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  const isArabic = i18n.language === 'ar';
  
  return (
    <>
      <header className="bg-gradient-to-r from-soft-blue-400 via-soft-blue-300 to-mint-400 text-slate-800 border-b border-soft-blue-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 sticky top-0 z-50 w-full">
        <div className="flex items-center justify-between w-full max-w-full">
          <div className="flex-1 min-w-0 mr-2">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 truncate">
              {t('app.name')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-700/80 font-medium mt-0.5 sm:mt-1 italic truncate">
              {t('app.tagline')}
            </p>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse flex-shrink-0">
            {/* Language Toggle - More compact for mobile */}
            <div className="flex items-center bg-white/30 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1.5 sm:py-2 border border-white/40 shadow-sm">
              <Languages className="w-3 h-3 sm:w-4 sm:h-4 text-slate-700 flex-shrink-0 mr-1 sm:mr-2" />
              <div className="flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse">
                <span className={`text-xs sm:text-sm font-bold transition-colors duration-200 ${!isArabic ? 'text-slate-800' : 'text-slate-600'}`}>
                  EN
                </span>
                <Switch
                  checked={isArabic}
                  onCheckedChange={toggleLanguage}
                  className="data-[state=checked]:bg-soft-blue-600 data-[state=unchecked]:bg-white/60 h-4 w-7 sm:h-5 sm:w-9 [&>span]:h-3 [&>span]:w-3 sm:[&>span]:h-4 sm:[&>span]:w-4 [&>span]:data-[state=checked]:translate-x-3 sm:[&>span]:data-[state=checked]:translate-x-4 [&>span]:data-[state=unchecked]:translate-x-0"
                />
                <span className={`text-xs sm:text-sm font-bold transition-colors duration-200 ${isArabic ? 'text-slate-800' : 'text-slate-600'}`}>
                  ع
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleSearchClick}
              className="p-1 sm:p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors border border-white/30 flex-shrink-0"
            >
              <Search className="w-3 h-3 sm:w-4 sm:h-4 text-slate-700" />
            </button>
            
            {user && <NotificationPanel userId={user.id} />}
            
            {/* User Menu - Smaller */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 flex-shrink-0 p-0">
                    <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || 'User'} />
                      <AvatarFallback className="bg-slate-100 text-slate-700 text-xs">
                        {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.user_metadata?.full_name && (
                        <p className="font-medium text-sm">{user.user_metadata.full_name}</p>
                      )}
                      <p className="w-[200px] truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/bookings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>My Bookings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </>
  );
};

export default Header;
