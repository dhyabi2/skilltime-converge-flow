
import React, { useState } from 'react';
import { Search, Bell, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileDrawer from './MobileDrawer';
import SearchModal from '../search/SearchModal';
import NotificationPanel from '../notifications/NotificationPanel';
import { useNotifications } from '@/hooks/useNotifications';

const MobileHeader = () => {
  const { t, i18n } = useTranslation('common');
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { unreadCount } = useNotifications();

  const isProfilePage = location.pathname === '/profile';
  const canGoBack = location.pathname !== '/' && location.pathname !== '/home';
  const isRTL = i18n.language === 'ar';

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  // Use the appropriate arrow icon based on language direction
  const BackArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <>
      <header className="bg-gradient-to-r from-soft-blue-400 via-soft-blue-300 to-mint-400 text-slate-800 border-b border-soft-blue-200 px-3 py-3 fixed top-0 left-0 right-0 z-[60] w-full">
        <div className="flex items-center justify-between w-full">
          
          {/* Left Side */}
          <div className="flex items-center gap-2">
            {canGoBack ? (
              <Button 
                variant="ghost" 
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-white/30 transition-colors"
                onClick={handleBack}
              >
                <BackArrowIcon className="h-5 w-5 text-slate-700" />
              </Button>
            ) : (
              <MobileDrawer user={user} onSearchClick={() => setIsSearchModalOpen(true)} />
            )}
          </div>
          
          {/* Center - Brand Logo */}
          <div className="flex-1 flex justify-center">
            {isProfilePage ? (
              <h1 className="text-lg font-bold text-slate-800 truncate">
                {t('navigation.profile')}
              </h1>
            ) : (
              <>
                <img 
                  src="/brandlogo.png" 
                  alt="Brand Logo" 
                  className="h-8 w-auto max-w-[120px] object-contain"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <h1 className="text-lg font-bold text-slate-800 truncate hidden">
                  {t('app.name')}
                </h1>
              </>
            )}
          </div>
          
          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Quick Search */}
            <Button 
              variant="ghost" 
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-white/30 transition-colors relative"
              onClick={() => setIsSearchModalOpen(true)}
            >
              <Search className="h-4 w-4 text-slate-700" />
            </Button>

            {/* Notifications with real-time count */}
            {user && (
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-white/30 transition-colors relative"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <Bell className="h-4 w-4 text-slate-700" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </Badge>
                  )}
                </Button>
                {isNotificationOpen && (
                  <div className="absolute right-0 top-full mt-2 z-50">
                    <NotificationPanel userId={user.id} />
                  </div>
                )}
              </div>
            )}

            {/* Profile Avatar */}
            {user && (
              <button onClick={handleProfileClick} className="focus:outline-none">
                <Avatar className="h-9 w-9 ring-2 ring-white/50 hover:ring-white/70 transition-all duration-200 cursor-pointer hover:scale-105">
                  <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || 'User'} />
                  <AvatarFallback className="bg-slate-100 text-slate-700 text-xs">
                    {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Modals */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </>
  );
};

export default MobileHeader;
