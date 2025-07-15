
import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from 'react-i18next';

interface MobileProfileTabsProps {
  children: React.ReactNode;
  defaultValue: string;
  notificationCounts?: {
    bookings?: number;
    reviews?: number;
    settings?: number;
  };
}

const MobileProfileTabs: React.FC<MobileProfileTabsProps> = ({ 
  children, 
  defaultValue,
  notificationCounts = {}
}) => {
  const { t } = useTranslation('profile');
  const [activeTab, setActiveTab] = useState(defaultValue);
  const tabsListRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { value: 'overview', label: t('tabs.overview'), icon: '🏠', shortLabel: t('tabs.home') },
    { value: 'skills', label: t('tabs.skills'), icon: '🎯', shortLabel: t('tabs.skills') },
    { value: 'bookings', label: t('tabs.bookings'), icon: '📅', shortLabel: t('tabs.book'), count: notificationCounts.bookings },
    { value: 'reviews', label: t('tabs.reviews'), icon: '⭐', shortLabel: t('tabs.reviews'), count: notificationCounts.reviews },
    { value: 'settings', label: t('tabs.settings'), icon: '⚙️', shortLabel: t('tabs.set'), count: notificationCounts.settings }
  ];

  // Auto-scroll to active tab
  useEffect(() => {
    if (tabsListRef.current) {
      const activeTabElement = tabsListRef.current.querySelector(`[data-value="${activeTab}"]`);
      if (activeTabElement) {
        activeTabElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest',
          inline: 'center' 
        });
      }
    }
  }, [activeTab]);

  // Handle swipe gestures
  const handleTouchStart = useRef({ x: 0, y: 0, time: 0 });
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - handleTouchStart.current.x;
    const deltaY = touch.clientY - handleTouchStart.current.y;
    const deltaTime = Date.now() - handleTouchStart.current.time;

    // Only trigger if it's a horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50 && deltaTime < 300) {
      const currentIndex = tabs.findIndex(tab => tab.value === activeTab);
      if (deltaX > 0 && currentIndex > 0) {
        // Swipe right - previous tab
        setActiveTab(tabs[currentIndex - 1].value);
      } else if (deltaX < 0 && currentIndex < tabs.length - 1) {
        // Swipe left - next tab
        setActiveTab(tabs[currentIndex + 1].value);
      }
    }
  };

  const handleTouchStartCapture = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleTouchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      {/* Enhanced TabsList with better mobile support */}
      <div 
        ref={tabsListRef}
        className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-sm sticky top-[72px] z-40"
      >
        <TabsList className="w-full h-auto p-0 bg-transparent">
          <div className="flex overflow-x-auto scrollbar-hide min-w-full">
            <div className="flex space-x-0 min-w-max">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  data-value={tab.value}
                  className="relative flex-shrink-0 min-w-[90px] max-w-[120px] text-xs px-3 py-4 whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 hover:scale-105 rounded-none border-b-2 border-transparent data-[state=active]:border-soft-blue-500"
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1">
                      <span className="text-base">{tab.icon}</span>
                      {tab.count && tab.count > 0 && (
                        <Badge variant="destructive" className="h-4 w-4 p-0 text-xs rounded-full flex items-center justify-center">
                          {tab.count > 9 ? '9+' : tab.count}
                        </Badge>
                      )}
                    </div>
                    <span className="hidden xs:inline text-xs font-medium">{tab.label}</span>
                    <span className="xs:hidden text-xs font-medium">{tab.shortLabel}</span>
                  </div>
                </TabsTrigger>
              ))}
            </div>
          </div>
        </TabsList>
      </div>
      
      {/* Tab Content with swipe support */}
      <div 
        onTouchStart={handleTouchStartCapture}
        onTouchEnd={handleTouchEnd}
        className="min-h-screen"
      >
        {children}
      </div>
    </Tabs>
  );
};

export default MobileProfileTabs;
