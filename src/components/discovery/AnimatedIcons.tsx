
import React from 'react';
import { 
  DesignIcon, 
  DevelopmentIcon, 
  MarketingIcon, 
  WritingIcon, 
  MusicIcon, 
  PhotographyIcon 
} from './icons';

interface AnimatedIconProps {
  iconType: string;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({ iconType, containerRef }) => {
  const getAnimatedIcon = (iconType: string) => {
    // Map both Arabic and English category titles to their corresponding animated icons
    const getIconByType = (type: string) => {
      const iconMap: { [key: string]: string } = {
        // English mappings (primary)
        'design': '🎨',
        'development': '💻',
        'marketing': '📈',
        'writing': '✍️',
        'music': '🎵',
        'photography': '📸',
        // Arabic mappings (fallback)
        'التصميم': '🎨',
        'البرمجة': '💻', 
        'التسويق': '📈',
        'الكتابة': '✍️',
        'الموسيقى': '🎵',
        'التصوير': '📸'
      };
      
      return iconMap[type] || type;
    };

    const mappedIcon = getIconByType(iconType);

    switch (mappedIcon) {
      case '🎨': // Design
        return <DesignIcon containerRef={containerRef} />;
      
      case '💻': // Development
        return <DevelopmentIcon containerRef={containerRef} />;
      
      case '📈': // Marketing
        return <MarketingIcon containerRef={containerRef} />;
      
      case '✍️': // Writing
        return <WritingIcon containerRef={containerRef} />;
      
      case '🎵': // Music
        return <MusicIcon containerRef={containerRef} />;
      
      case '📸': // Photography
        return <PhotographyIcon containerRef={containerRef} />;
      
      default:
        return <div className="text-3xl">🎨</div>;
    }
  };

  return getAnimatedIcon(iconType);
};
