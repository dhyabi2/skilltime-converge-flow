
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
      <header className="bg-gradient-to-r from-soft-blue-400 via-soft-blue-300 to-mint-400 text-slate-800 border-b border-soft-blue-200 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-800">
              {t('app.name')}
            </h1>
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
            
            <button 
              onClick={handleSearchClick}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors border border-white/30"
            >
              <Search className="w-5 h-5 text-slate-700" />
            </button>
            
            {user && <NotificationPanel userId={user.id} />}
            
            {/* User Menu */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || 'User'} />
                      <AvatarFallback className="bg-slate-100 text-slate-700">
                        {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.user_metadata?.full_name && (
                        <p className="font-medium">{user.user_metadata.full_name}</p>
                      )}
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
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
