
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, User, Search } from 'lucide-react';
import { gsap } from 'gsap';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Browse', path: '/browse' },
    { icon: Calendar, label: 'Bookings', path: '/bookings' },
    { icon: User, label: 'Profile', path: '/profile' },
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
      className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-white/20 px-4 py-2 z-50"
    >
      <div className="relative">
        <div 
          ref={indicatorRef}
          className="absolute top-0 left-0 w-1/4 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-transform duration-300"
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
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-purple-600 scale-110' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
