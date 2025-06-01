
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface AnimatedIconProps {
  iconType: string;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({ iconType, containerRef }) => {
  useEffect(() => {
    if (containerRef.current) {
      // Animate icon construction
      const animateIcon = () => {
        const paths = containerRef.current?.querySelectorAll('.icon-path-1, .icon-path-2, .icon-path-3');
        const lines = containerRef.current?.querySelectorAll('.icon-line-1');
        const circles = containerRef.current?.querySelectorAll('.icon-circle-1, .icon-circle-2, .icon-circle-3');
        const rects = containerRef.current?.querySelectorAll('.icon-rect-1');

        const tl = gsap.timeline({ delay: 0.5 });

        // Draw paths and lines
        if (paths) {
          tl.to(paths, {
            drawSVG: "100%",
            duration: 1,
            ease: "power2.inOut",
            stagger: 0.2
          });
        }

        if (lines) {
          tl.to(lines, {
            drawSVG: "100%",
            duration: 0.8,
            ease: "power2.inOut",
            stagger: 0.1
          }, "-=0.5");
        }

        // Scale in rectangles
        if (rects) {
          tl.to(rects, {
            scaleX: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1
          }, "-=0.8");
        }

        // Scale in circles
        if (circles) {
          tl.to(circles, {
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            stagger: 0.1
          }, "-=0.4");
        }
      };

      animateIcon();
    }
  }, [containerRef]);

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
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" className="text-black">
            <path
              ref={el => el && gsap.set(el, { drawSVG: "0%" })}
              d="M20 5 L35 15 L35 25 L20 35 L5 25 L5 15 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="icon-path-1"
            />
            <circle
              ref={el => el && gsap.set(el, { scale: 0 })}
              cx="20"
              cy="20"
              r="8"
              fill="currentColor"
              className="icon-circle-1"
            />
            <path
              ref={el => el && gsap.set(el, { drawSVG: "0%" })}
              d="M15 15 L25 25 M25 15 L15 25"
              stroke="white"
              strokeWidth="2"
              className="icon-path-2"
            />
          </svg>
        );
      
      case '💻': // Development
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" className="text-black">
            <rect
              ref={el => el && gsap.set(el, { scaleX: 0 })}
              x="5"
              y="10"
              width="30"
              height="20"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="icon-rect-1"
            />
            <path
              ref={el => el && gsap.set(el, { drawSVG: "0%" })}
              d="M12 18 L16 22 L12 26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="icon-path-1"
            />
            <line
              ref={el => el && gsap.set(el, { drawSVG: "0%" })}
              x1="20"
              y1="24"
              x2="28"
              y2="24"
              stroke="currentColor"
              strokeWidth="2"
              className="icon-line-1"
            />
          </svg>
        );
      
      case '📈': // Marketing
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" className="text-black">
            <path
              ref={el => el && gsap.set(el, { drawSVG: "0%" })}
              d="M5 30 L15 20 L25 25 L35 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="icon-path-1"
            />
            <circle
              ref={el => el && gsap.set(el, { scale: 0 })}
              cx="15"
              cy="20"
              r="3"
              fill="currentColor"
              className="icon-circle-1"
            />
            <circle
              ref={el => el && gsap.set(el, { scale: 0 })}
              cx="25"
              cy="25"
              r="3"
              fill="currentColor"
              className="icon-circle-2"
            />
            <circle
              ref={el => el && gsap.set(el, { scale: 0 })}
              cx="35"
              cy="10"
              r="3"
              fill="currentColor"
              className="icon-circle-3"
            />
          </svg>
        );
      
      case '✍️': // Writing
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" className="text-black">
            <path
              ref={el => el && gsap.set(el, { drawSVG: "0%" })}
              d="M8 32 L32 8 L35 11 L11 35 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="icon-path-1"
            />
            <path
              ref={el => el && gsap.set(el, { drawSVG: "0%" })}
              d="M28 12 L32 8 L35 11 L31 15"
              fill="currentColor"
              className="icon-path-2"
            />
            <line
              ref={el => el && gsap.set(el, { drawSVG: "0%" })}
              x1="8"
              y1="32"
              x2="12"
              y2="28"
              stroke="currentColor"
              strokeWidth="2"
              className="icon-line-1"
            />
          </svg>
        );
      
      case '🎵': // Music
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" className="text-black">
            <path
              ref={el => el && gsap.set(el, { drawSVG: "0%" })}
              d="M15 8 L15 28"
              stroke="currentColor"
              strokeWidth="3"
              className="icon-path-1"
            />
            <path
              ref={el => el && gsap.set(el, { drawSVG: "0%" })}
              d="M25 5 L25 25"
              stroke="currentColor"
              strokeWidth="3"
              className="icon-path-2"
            />
            <circle
              ref={el => el && gsap.set(el, { scale: 0 })}
              cx="15"
              cy="30"
              r="4"
              fill="currentColor"
              className="icon-circle-1"
            />
            <circle
              ref={el => el && gsap.set(el, { scale: 0 })}
              cx="25"
              cy="27"
              r="4"
              fill="currentColor"
              className="icon-circle-2"
            />
            <path
              ref={el => el && gsap.set(el, { drawSVG: "0%" })}
              d="M15 8 Q25 5 25 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="icon-path-3"
            />
          </svg>
        );
      
      case '📸': // Photography
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" className="text-black">
            <rect
              ref={el => el && gsap.set(el, { scaleX: 0 })}
              x="5"
              y="12"
              width="30"
              height="20"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="icon-rect-1"
            />
            <path
              ref={el => el && gsap.set(el, { drawSVG: "0%" })}
              d="M15 12 L17 8 L23 8 L25 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="icon-path-1"
            />
            <circle
              ref={el => el && gsap.set(el, { scale: 0 })}
              cx="20"
              cy="22"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="icon-circle-1"
            />
            <circle
              ref={el => el && gsap.set(el, { scale: 0 })}
              cx="30"
              cy="16"
              r="1.5"
              fill="currentColor"
              className="icon-circle-2"
            />
          </svg>
        );
      
      default:
        return <div className="text-3xl">🎨</div>;
    }
  };

  return getAnimatedIcon(iconType);
};
