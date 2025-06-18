
import React, { useState } from 'react';
import { Search, Languages, LogOut, User, Settings, Menu } from 'lucide-react';
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
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

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  const isArabic = i18n.language === 'ar';
  
  return (
    <>
      <header className="bg-gradient-to-r from-soft-blue-400 via-soft-blue-300 to-mint-400 text-slate-800 border-b border-soft-blue-200 px-4 py-4 sticky top-0 z-50 w-full">
        <div className="flex items-center justify-between w-full">
          
          {/* Hamburger Menu - Left Side */}
          <div className="flex items-center gap-3">
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-white/30 transition-colors"
                >
                  <Menu className="h-5 w-5 text-slate-700" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-white/95 backdrop-blur-md border-t border-soft-blue-200">
                <DrawerHeader className="text-center border-b border-soft-blue-200/50 pb-4">
                  <DrawerTitle className="text-xl font-bold text-slate-800">
                    {t('app.name')}
                  </DrawerTitle>
                </DrawerHeader>
                
                <div className="p-6 space-y-4">
                  {/* Language Toggle */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/40 backdrop-blur-sm border border-white/50">
                    <div className="flex items-center gap-2">
                      <Languages className="w-4 h-4 text-slate-700" />
                      <span className="text-sm font-medium text-slate-700">Language</span>
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

                  {/* Search */}
                  <button 
                    onClick={handleSearchClick}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/40 backdrop-blur-sm border border-white/50 hover:bg-white/60 transition-all duration-200"
                  >
                    <Search className="w-4 h-4 text-slate-700" />
                    <span className="text-sm font-medium text-slate-700">Search</span>
                  </button>

                  {/* Navigation Links */}
                  {user && (
                    <div className="space-y-2">
                      <button 
                        onClick={() => handleNavigation('/profile')}
                        className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/40 backdrop-blur-sm border border-white/50 hover:bg-white/60 transition-all duration-200"
                      >
                        <User className="w-4 h-4 text-slate-700" />
                        <span className="text-sm font-medium text-slate-700">Profile</span>
                      </button>
                      
                      <button 
                        onClick={() => handleNavigation('/bookings')}
                        className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/40 backdrop-blur-sm border border-white/50 hover:bg-white/60 transition-all duration-200"
                      >
                        <Settings className="w-4 h-4 text-slate-700" />
                        <span className="text-sm font-medium text-slate-700">My Bookings</span>
                      </button>
                      
                      <button 
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-100/60 backdrop-blur-sm border border-red-200/50 hover:bg-red-200/60 transition-all duration-200"
                      >
                        <LogOut className="w-4 h-4 text-red-700" />
                        <span className="text-sm font-medium text-red-700">Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
                
                <DrawerClose asChild>
                  <Button variant="outline" className="mx-6 mb-6">
                    Close
                  </Button>
                </DrawerClose>
              </DrawerContent>
            </Drawer>

            {/* Quick Actions */}
            {user && <NotificationPanel userId={user.id} />}
            
            {user && (
              <Avatar className="h-8 w-8 ring-2 ring-white/50">
                <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || 'User'} />
                <AvatarFallback className="bg-slate-100 text-slate-700 text-xs">
                  {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          
          {/* App Name - Right Side */}
          <div className="text-right">
            <h1 className="text-lg lg:text-xl font-bold text-slate-800">
              {t('app.name')}
            </h1>
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
