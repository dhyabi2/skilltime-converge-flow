
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
        <div className="flex items-center justify-between w-full">
          {/* Icons Area - Left Half */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-2 sm:px-2.5 py-1 border border-white/30 shadow-sm w-1/2 justify-start">
            {/* Language Toggle - More compact */}
            <div className="flex items-center gap-0.5">
              <Languages className="w-2.5 h-2.5 text-slate-700 flex-shrink-0" />
              <div className="flex items-center gap-0.5">
                <span className={`text-[9px] sm:text-[10px] font-bold transition-colors duration-200 ${!isArabic ? 'text-slate-800' : 'text-slate-600'}`}>
                  EN
                </span>
                <Switch
                  checked={isArabic}
                  onCheckedChange={toggleLanguage}
                  className="data-[state=checked]:bg-soft-blue-600 data-[state=unchecked]:bg-white/60 h-2.5 w-4 sm:h-3 sm:w-5 [&>span]:h-1.5 [&>span]:w-1.5 sm:[&>span]:h-2 sm:[&>span]:w-2 [&>span]:data-[state=checked]:translate-x-1.5 sm:[&>span]:data-[state=checked]:translate-x-2 [&>span]:data-[state=unchecked]:translate-x-0"
                />
                <span className={`text-[9px] sm:text-[10px] font-bold transition-colors duration-200 ${isArabic ? 'text-slate-800' : 'text-slate-600'}`}>
                  ع
                </span>
              </div>
            </div>
            
            {/* Search Button */}
            <button 
              onClick={handleSearchClick}
              className="p-0.5 rounded-full hover:bg-white/30 transition-colors flex-shrink-0"
            >
              <Search className="w-2.5 h-2.5 text-slate-700" />
            </button>
            
            {/* Notifications */}
            {user && <NotificationPanel userId={user.id} />}
            
            {/* User Menu */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-4 w-4 sm:h-5 sm:w-5 rounded-full hover:bg-white/30 flex-shrink-0 p-0">
                    <Avatar className="h-3.5 w-3.5 sm:h-4 sm:w-4">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || 'User'} />
                      <AvatarFallback className="bg-slate-100 text-slate-700 text-[7px] sm:text-[8px]">
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
          
          {/* App Name - Right Half */}
          <div className="flex-1 w-1/2 ml-3 text-right">
            <h1 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 truncate">
              {t('app.name')}
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-700/80 font-medium mt-0.5 italic truncate">
              {t('app.tagline')}
            </p>
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
