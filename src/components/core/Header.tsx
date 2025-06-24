
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import NotificationPanel from '../notifications/NotificationPanel';
import SearchModal from '../search/SearchModal';
import MobileDrawer from './MobileDrawer';
import UserAvatar from './UserAvatar';

const Header = () => {
  const { t } = useTranslation('common');
  const { user } = useAuth();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-soft-blue-400 via-soft-blue-300 to-mint-400 text-slate-800 border-b border-soft-blue-200 px-4 py-4 sticky top-0 z-50 w-full">
        <div className="flex items-center justify-between w-full">
          
          {/* Hamburger Menu - Left Side */}
          <div className="flex items-center gap-3">
            <MobileDrawer user={user} onSearchClick={handleSearchClick} />

            {/* Quick Actions */}
            {user && <NotificationPanel userId={user.id} />}
            
            {user && <UserAvatar user={user} />}
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
