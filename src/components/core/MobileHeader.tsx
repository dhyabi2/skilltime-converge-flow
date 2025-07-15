
import React, { useState } from 'react';
import { Search, Bell, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileDrawer from './MobileDrawer';
import SearchModal from '../search/SearchModal';
import NotificationPanel from '../notifications/NotificationPanel';

const MobileHeader = () => {
  const { t } = useTranslation('common');
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const isProfilePage = location.pathname === '/profile';
  const canGoBack = location.pathname !== '/' && location.pathname !== '/home';

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

  return (
    <>
      <header className="bg-gradient-to-r from-soft-blue-400 via-soft-blue-300 to-mint-400 text-slate-800 border-b border-soft-blue-200 px-3 py-3 sticky top-0 z-50 w-full">
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
                <ArrowLeft className="h-5 w-5 text-slate-700" />
              </Button>
            ) : (
              <MobileDrawer user={user} onSearchClick={() => setIsSearchModalOpen(true)} />
            )}
          </div>
          
          {/* Center - App Name */}
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold text-slate-800 truncate">
              {isProfilePage ? t('navigation.profile') : t('app.name')}
            </h1>
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

            {/* Notifications */}
            {user && (
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-white/30 transition-colors relative"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <Bell className="h-4 w-4 text-slate-700" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
                    3
                  </Badge>
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
