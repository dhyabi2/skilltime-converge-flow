
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, User, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('common');
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { icon: Home, label: t('navigation.home'), path: '/' },
    { icon: Search, label: t('navigation.browse'), path: '/browse' },
    { icon: Calendar, label: t('navigation.bookings'), path: '/bookings' },
    { icon: User, label: t('navigation.profile'), path: '/profile' },
  ];

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
      );
    }
  }, []);

  const handleNavClick = (path: string, index: number) => {
    navigate(path);
    
    // Animate indicator
    if (indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        x: index * 25 + '%',
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const getActiveIndex = () => {
    return navItems.findIndex(item => item.path === location.pathname);
  };

  return (
    <nav 
      ref={navRef}
      className="fixed bottom-0 left-0 right-0 glass-nav px-2 sm:px-4 py-1 sm:py-2 z-50 w-full glass-shimmer"
    >
      <div className="relative max-w-md mx-auto">
        <div 
          ref={indicatorRef}
          className="absolute top-0 left-0 w-1/4 h-1 bg-gradient-to-r from-soft-blue-500 to-mint-500 rounded-full transition-transform duration-300 glass-shimmer"
          style={{ transform: `translateX(${getActiveIndex() * 100}%)` }}
        />
        <div className="flex justify-around items-center pt-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path, index)}
                className={`flex flex-col items-center py-2 px-2 sm:px-3 rounded-lg transition-all duration-200 min-h-[44px] glass-button ${
                  isActive 
                    ? 'text-slate-800 scale-110 bg-white/20' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-white/10'
                }`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1 ${isActive ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-medium truncate max-w-[60px] sm:max-w-none">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
